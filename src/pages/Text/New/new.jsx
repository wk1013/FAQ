import React, { Component } from 'react';
import { Input, Button } from 'antd';
import request, { extend } from 'umi-request';
import router from 'umi/router';
import styles from '../index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onClick() {
    const value = this.state.value;
    request('http://192.168.26.165:8888/domain/addDomain', { method:'post', params: {domainName:value} , headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTYwOTk2MjEyfQ._jCmJeSqMrLzXroGkKaLBJKBXGEHbe40ZWrvCJHeLDY'}}).then(res=>{
      console.log(res)
      if(res.data){
        router.goBack()
      }
    }).catch(err=>{})
  }

  render() {
    return (
      <div className={styles.new}>
        <div className={styles.input}>
          <span>问答集领域名称：</span>
          <Input
            placeholder="请输入新领域"
            allowClear
            style={{ width: 300 }}
            onChange={e => this.onChange(e)}
          />
        </div>
        <Button className={styles.button} onClick={this.onClick.bind(this)} type="primary">
          提交
        </Button>
      </div>
    );
  }
}
