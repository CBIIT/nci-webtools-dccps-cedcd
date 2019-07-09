import React, {Component} from 'react';
import {Query, Builder, Utils as QbUtils} from 'react-awesome-query-builder';
import config from './config'; //see below 'Config format'
import 'react-awesome-query-builder/css/styles.scss';
import 'react-awesome-query-builder/css/compact_styles.scss';
import 'react-awesome-query-builder/css/denormalize.scss';

class DemoQueryBuilder extends Component {
    render() {                
        return (
            <div>
                <Query 
                  {...config} 
                  //you can pass object here, see treeJSON at onChange
                  //value=transit.fromJSON(treeJSON)
                  get_children={this.getChildren}
                  onChange={this.onChange}
                ></Query>
            </div>
        );
    }
    
    getChildren(props) {
        return (
            <div>
                <div className="query-builder">
                    <Builder {...props} />
                </div>
                <div>Query string: {QbUtils.queryString(props.tree, props.config)}</div>
                <div>Mongodb query: {QbUtils.mongodbFormat(props.tree, props.config)}</div>
            </div>
        )
    }
    
    onChange(tree) {
      //here you can save tree object: 
      //var treeJSON = transit.toJSON(tree)
    }
}