import React, { Component } from 'react';
import { Input, Button } from 'antd';
import router from 'umi/router';
import styles from './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.query.data,
      value: '',
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  //提交
  onSubmit() {
    const value = this.state.value;
    console.log(value);
  }

  //取消
  onCancel() {
    router.goBack();
  }

  render() {
    const { TextArea } = Input;
    return (
      <div className={styles.body}>
        <div className={styles.text}>
          <div>
            <span className={styles.color}>领域：</span>
            <span>{this.state.data.realm}</span>
          </div>
          <div>
            <span className={styles.color}>问题ID：</span>
            <span>{this.state.data.quID}</span>
          </div>
        </div>
        <div className={styles.text}>
          <div>
            <span className={styles.color}>问题：</span>
            <span>{this.state.data.question}</span>
          </div>
          <div>
            <span className={styles.color}>答案：</span>
            <span>{this.state.data.answer}</span>
          </div>
        </div>
        <div>
          <span className={styles.color}>扩展问题修改：</span>
        </div>
        <TextArea rows={4} className={styles.input} onChange={e => this.onChange(e)} />
        <div className={styles.text_button}>
          <Button onClick={this.onSubmit.bind(this)} type="primary">
            提交
          </Button>
          <Button onClick={this.onCancel.bind(this)} type="primary">
            取消
          </Button>
        </div>
      </div>
    );
  }
}
