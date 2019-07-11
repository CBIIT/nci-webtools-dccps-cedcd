import React, { Component } from 'react';
import GenderList from '../GenderList/GenderList';
import RaceList from '../RaceList/RaceList';
import EthnicityList from '../EthnicityList/EthnicityList';
import AgeList from '../AgeList/AgeList';
import CollectedDataList from '../CollectedDataList/CollectedDataList';
import CollectedSpecimensList from '../CollectedSpecimensList/CollectedSpecimensList';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';
import DiseaseStateList from '../DiseaseStateList/DiseaseStateList';
import { render } from 'react-dom';

class Testing extends Component {
  constructor() {
    super();
    this.state = {
		  types:[0],
      selectionList:[[],[],[]],
      filter:{
				participant:{
					gender:[],
					race:[],
					ethnicity:[],
					age:[]
				},
				collect:{
					cancer:[],
					data:[],
					specimen:[]
				},
				study:{
					state:[]
				}
      },
      booleanStates:[
        'Doesn\'t Matter',
        'AND',
        'AND'
      ],
      items: [
        'Select',
        'Select',
        'Select'
      ],
      itemText: 'Brian',
    };
  }

  removeItem(index) {
    const { items, booleanStates, selectionList } = this.state;
    if(items.length > 1){
      items.splice(index, 1);
      booleanStates.splice(index, 1);
      selectionList.splice(index, 1);
      this.setState({ 
        items: items,
        booleanStates: booleanStates,
        selectionList: selectionList
      });
    }
  }

  addItem(index) {
	const { items, booleanStates, selectionList } = this.state;
  items.splice(index,0,'Select');
  booleanStates.splice(index,0,'AND');
  selectionList.splice(index,0,[]);
  console.log(items);
  console.log(booleanStates);
  console.log("selectionList");
  for(var i = 0; i < selectionList.length; i++){
    console.log(selectionList[i]);
  }
    this.setState({
      items: items,
      booleanStates:booleanStates,
      selectionList: selectionList
    });
    this.itemInput = null;
  }

  handleSelectChange(e, index){
      const { items } = this.state;
      items[index]= e.target.value;
      this.setState({
        items: items
      });
  }

  handleGeneralListClick(v, index){
    const {selectionList} = this.state;
    const currList = selectionList[index];
    let idx = selectionList[index].indexOf(v);
    
		if(idx > -1){
			//remove element
			currList.splice(idx,1);
		}
		else{
			//add element
			currList.push(v);
    }
    selectionList[index] = currList;
		this.setState({
			selectionList: selectionList
    });
    
  }
  
	handleCancerClick (v,allIds,e,index){
		const {selectionList} = this.state;
    const currList = selectionList[index];
   
    
		if(v){
      let idx = selectionList[index].indexOf(v);
			if(idx > -1){
        //remove element
        currList.splice(idx,1);
      }
      else{
        //add element
        currList.push(v);
      }
		}
		else{
			//click on the "all cohort"
			currList.splice(0,currList.length);
			if(e.target.checked){
        allIds.forEach(function(element){
          currList.push(element );
        });
			}
    }
    selectionList[index] = currList;
		this.setState({
			selectionList: selectionList
		});
  }

  createSelectItems(index) {

    const {items} = this.state;
    const currItem = items[index];
    if(currItem == "Gender"){
      return <GenderList hasUnknown={true} values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Race"){
      return <RaceList values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Ethnicity"){
      return <EthnicityList values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Age"){
      return <AgeList values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "State"){
      return <DiseaseStateList values={this.state.selectionList[index]} displayMax="5" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Categories"){
      return <CollectedDataList values={this.state.selectionList[index]} displayMax="5" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Biospecimen"){
      return <CollectedSpecimensList values={this.state.selectionList[index]} displayMax="5" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Cancers"){
      return <CollectedCancersList hasNoCancer={false} title="Cancers Collected" innertitle="Cancers Collected"  hasSelectAll={true} values={this.state.selectionList[index]} displayMax="5" onClick={(v,allIds,e) => this.handleCancerClick(v, allIds, e, index)}/>;
    }

    return;

  }

  createBoolean(index){
    const { booleanStates } = this.state;
    if(index > 0){
      return <select value = {booleanStates[index]} onChange={e => this.handleBooleanChange(e,index)}>
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
    }
    return;
  }

  handleBooleanChange(e, index){
    const { booleanStates } = this.state;
    booleanStates[index] = e.target.value;
    this.setState({
      booleanStates:booleanStates
    });
  }

  render() {
    const { items, itemText } = this.state;
    const itemList = items.map((item, index) => (
      <div>
        {this.createBoolean(index)}
        <select value={this.state.items[index]} onChange={e => this.handleSelectChange(e,index)}>
          <option value="Select" selected disabled hidden>-Select type-</option>
          <option value="Gender">Gender</option>
          <option value="Race">Race</option>
          <option value="Ethnicity">Ethnicity</option>
          <option value="Age">Age at Baseline</option>
          <option value="State">Study Population</option>
          <option value="Categories">Categories of Data Collected</option>
          <option value="Biospecimen">Types of Biospecimens Collected</option>
          <option value="Cancers">Cancers Collected</option>
        </select>
        {this.createSelectItems(index)}
	    	<button onClick={e => this.addItem(index+1)}>
          +
        </button>
        <button onClick={e => this.removeItem(index)}>
          &times;
        </button>
      </div>
    ));

    return (
      <div>
        {itemList}
      </div>
    );
  }
}

export default Testing;