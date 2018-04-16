import React, { Component } from 'react';
import './Paging.css';

class Paging extends Component {

  render() {
    
      let pageInfo = this.props.pageInfo;
      if(pageInfo.page == 0){
        return (
          <div id="summaryPager" className="table-pager">
            <a id="view_less" href="javascript:void(0);"  onClick={() => this.props.onClick(-1)}>View Less</a>
          </div>
        );
      }
      else{
        let totalPage = Math.ceil(pageInfo.total/pageInfo.pageSize);
        let previous;
        if(pageInfo.page > 1){
          const idx = pageInfo.page -1;
          previous = (
             <a id="previous" className="arrow prev" href="javascript:void(0);" onClick={() => this.props.onClick(idx)}>previous</a>
          );
        }
        else{
          previous = "";
        }

        let next;
        if(pageInfo.page < totalPage){
          const idx = pageInfo.page +1;
          next = (
             <a id="next" className="arrow next" href="javascript:void(0);" onClick={() => this.props.onClick(idx)}>next</a>
          );
        }
        else{
          next = "";
        }

        let pages = [];
        for(let i = pageInfo.page - 5; i < pageInfo.page + 5; i++){
          if(i >= 1 && i <= totalPage){
            pages.push(i);
          }
        }

        const pagesHtml = pages.map((item, index) => {
          const cls = item == pageInfo.page ? "active" :"";
          return (
            <a key={item} className={cls} href="javascript:void(0);" onClick={() => this.props.onClick(item)}>{item}</a>
          );
        });

        return (
        <div id="summaryPager" className="table-pager">
          {previous}
          {pagesHtml}
          {next}
          <a id="view_all" href="javascript:void(0);" onClick={() => this.props.onClick(0)}>View All</a>
        </div>
        );
      }
  }
}

export default Paging;
