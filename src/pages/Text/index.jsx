import React, { Component } from 'react';
import { Input, Button, Table, Divider, Tag } from 'antd';
import router from 'umi/router';
import request, { extend } from 'umi-request';
import styles from './index.less';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount(){
    this.getList()
  }

  getList(){
    request.post('http://192.168.26.165:8888/domain/domainList').then(res=>{
      const list = res.data
      this.setState({
        data:list
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  //新增领域
  onNew() {
    router.push('./New');
  }

  // onSearch = value => {
  //   this.setState({

  //   });
  // };

  //管理
  onManage(number) {
    router.push({
      pathname: './Manage',
      query: {
        data: number,
      },
    });
  }

  //删除
  onDelate(name) {
    request.post('http://192.168.26.165:8888/domain/deleteDomain', {params: {domainName:name.领域} , headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTYwOTk2MjEyfQ._jCmJeSqMrLzXroGkKaLBJKBXGEHbe40ZWrvCJHeLDY'}}).then(res=>{
      console.log(res)
      if(res.data){
        this.getList();
      }
    }).catch(err=>{})
  }

  render() {
    const Search = Input.Search;
    const columns = [
      {title: '序号',dataIndex:'',
        render: (text,record,index) =>{
          return <span>{index+1}</span>
        }
      },
      {title: '领域',dataIndex: '领域',key:'name'},
      {title: '操作',key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" className={styles.a} onClick={this.onManage.bind(this, record)}>
              管理
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" className={styles.b} onClick={this.onDelate.bind(this,record)}>
              删除
            </a>
          </span>
        ),
      },
    ];
    return (
      <div>
        {/* <div className={styles.container}>
          <span>问题集领域：</span>
          <Search placeholder="" onSearch={this.onSearch.bind(this)} style={{ width: 300 }} />
        </div> */}
        <div className={styles.tab_cont}>
          <div className={styles.list}>
            <Button onClick={this.onNew.bind(this)} type="primary">
              新建领域
            </Button>
            <Button onClick={this.getList.bind(this)} type="primary">
              领域更新生效
            </Button>
          </div>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={this.state.data}
            bordered={true}
          />
        </div>
      </div>
    );
  }
}
