/* eslint-disable no-alert */
/* eslint-disable react/no-multi-comp */
// import { Table, Header, SpaceBetween, Button, TextFilter, Pagination } from '@amzn/awsui-components-react/polaris';
import Table from 'aws-northstar/components/Table';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import Button from 'aws-northstar/components/Button';
import Inline from 'aws-northstar/layouts/Inline';

import React  from 'react';
import { connect } from 'react-redux' 

import axios from 'axios'
import Amplify, { API } from 'aws-amplify';

import {withTranslation} from 'react-i18next'

const mapStateToProps = state => {
  return { session: state.session }
}

const MapDispatchTpProps = (dispatch) => {
  return {
      changeLang: (key)=>dispatch({type: 'change_language',data: key})
  }
}

const columnDefinitions = [
    {
        'id': 'camera_id',
        width: 300,
        Header: 'ID',
        accessor: 'camera_id'
    },
    {
        'id': 'address',
        width: 600,
        Header: 'Address',
        accessor: 'address'
    },
    {
        'id': 'description',
        width: 300,
        Header: 'Description',
        accessor: 'description'
    },
    // {
    //     'id': 'location',
    //     width: 200,
    //     Header: 'location',
    //     accessor: 'location'
    // },
    {
        'id': 'brand',
        width: 200,
        Header: 'Name',
        accessor: 'brand'
    },
    // {
    //     'id': 'network',
    //     width: 200,
    //     Header: 'network',
    //     accessor: 'network'
    // },
    // {
    //     'id': 'image_size',
    //     width: 200,
    //     Header: 'image_size',
    //     accessor: 'image_size'
    // }
]

class  CameraCfgTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading : true ,
        job_list : [],
        curent : {}
    }
  }

  componentDidMount(){
    // console.log(this.model_list)
    this.setState({loading:true},()=>{
        this.load_data()
    })
  }

  async load_data(){
    await API.get('backend','/camera').then(res => {
        console.log('return Data',res)
        if (res){ 
            console.log(res)
            var _tmp_data = []
            res.forEach((item)=>{
                var _tmp = {}
                _tmp['camera_id'] = item['camera_id']
                _tmp['address'] = item['address']
                _tmp['description'] = item['description']
                _tmp['location'] = item['location']
                _tmp['brand'] = item['brand']
                _tmp['network'] = item['network']
                _tmp['image_size'] = item['image_size']    
                _tmp_data.push(_tmp)

            });
            this.setState({job_list:_tmp_data},()=>{
            })
            this.setState({loading:false})
        }
        // console.log(this.state.model_list)
        return res
    })
  }

  jump_to_newCfg(){
    this.props.history.push("/NewCameraConfig")
  }



  render(){
    const {
        props: {t}
    } = this;


    const tableActions = (
        <Inline>
            <Button variant="primary" onClick={() => this.jump_to_newCfg()}>
                {t('New Camera Config')}
            </Button>
        </Inline>
    );

    return(

        <Table
            id = "CameraCfgTable"
            actionGroup={tableActions}
            tableTitle={t('Camera Config')}
            multiSelect={false}
            columnDefinitions={columnDefinitions}
            items={this.state.job_list}
            onSelectionChange={(item)=>{this.setState({curent:item})}}
            // getRowId={this.getRowId}
            loading={this.state.loading}
            disableSettings={false}
            // onFetchData={this.handleFetchData}
        />
    )
  }
}


export default connect(mapStateToProps,MapDispatchTpProps)(withTranslation()(CameraCfgTable));

