import React from 'react';
import { Button } from 'antd';
import { CSVLink } from "react-csv";




export default class DownloadButton extends React.Component {
    // constructor(props){
    //     super(props)
    // }


    render() {
        return (
            <div className="absolute-download">
                <CSVLink data={this.props.data}  headers={this.props.headers} target="_blank" >
                    <Button type={ this.props.type ?? "dashed" } shape="circle" icon="download" size={this.props.size ?? 'large'} />
                </CSVLink>
            </div>
        );
    }
}