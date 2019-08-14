import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {saveAs} from 'file-saver';
import XLSX from 'xlsx';

function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

function datenum (v, date1904) {
  if (date1904) v+=1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays (data, header_Pos) {
  var ws = {}
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0}}
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = {};
      cell.v = data[R][C] == 0 ? 0 : data[R][C];
      if (cell.v == null) continue
      var cell_ref = XLSX.utils.encode_cell({c:C, r:R})

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

export class Column extends Component { // eslint-disable-line react/require-render-return
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired
  }

  render () {
    return null;
    //throw new Error('<Column/> is not meant to be rendered.')
  }
}

export class Sheet extends Component { // eslint-disable-line react/require-render-return
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf((propValue, key) => {
      const type = propValue[key].type
    }).isRequired
  }

  render () {
    return null;
    //throw new Error('<Sheet/> is not meant to be rendered.')
  }
}

export class Workbook extends Component {
  static propTypes = {
    filename: PropTypes.string,
    dataSource: PropTypes.oneOfType([
      PropTypes.func
    ]).isRequired,
    element: PropTypes.any,
    children: function (props, propName, componentName) {
      React.Children.forEach(props[propName], child => {
        if (child.type !== Sheet) {
          throw new Error('<Workbook> can only have <Sheet>\'s as children. ')
        }
      })
    }
  }

  constructor (props) {
    super(props)
    this.download = this.download.bind(this)
    this.createSheetsData = this.createSheetsData.bind(this)
  }

  createSheetsData (dataSource, next) {
      dataSource((result) => {
        let sheetsData = {};
        React.Children.forEach(this.props.children, sheet => {
          const columns = sheet.props.children;
          let sheetData = result.list[sheet.props.name].header;
          if(result.list[sheet.props.name].rows){
            sheetData.push(React.Children.map(columns, column => column.props.label));
            result.list[sheet.props.name].rows.forEach(row => {
              const sheetRow = [];
              React.Children.forEach(columns, column => {
                sheetRow.push(row[column.props.value] || '');
              });
              sheetData.push(sheetRow);
            });
          }
          else if(result.list[sheet.props.name].sections){
            result.list[sheet.props.name].sections.forEach(function(section){
                section.header.forEach(function(h){
                  sheetData.push(h);
                });
                sheetData.push(React.Children.map(columns, column => column.props.label));
                section.rows.forEach(row => {
                  const sheetRow = [];
                  React.Children.forEach(columns, column => {
                    sheetRow.push(row[column.props.value] || '');
                  });
                  sheetData.push(sheetRow);
                });
            });
              
          }
          else{
            
          }
          
          sheetsData[sheet.props.name] = sheet_from_array_of_arrays(sheetData,6);
        });
        

        next(sheetsData, result.filename);
      });
  }

  download () {
    const wb = {
      SheetNames: React.Children.map(this.props.children, sheet => sheet.props.name),
      Sheets: {}
    };
    const dataSource = this.props.dataSource;

    this.createSheetsData(dataSource,function(sheets, filename){
      wb.Sheets = sheets;
      //console.log(sheets);
      const wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
      saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), filename || 'data.xlsx');
    });
  }

  render () {
    return (
      <span id="exportSpan" onClick={this.download}>
        {this.props.element ? this.props.element : "Download"}
      </span>
    )
  }
}

Workbook.Column = Column
Workbook.Sheet = Sheet

export default Workbook