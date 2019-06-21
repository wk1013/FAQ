import React, { Component } from 'react';
import { Input, Tooltip, Icon, Button, Modal } from 'antd';
import router from 'umi/router';
import request, { extend } from 'umi-request';
import styles from './user.less';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: '',
            password: ''
        };
    }

    componentDidMount() {
    }

    onSubmit() {
        const user = this.state.user
        const password = this.state.password
        if (user == '' || password == '') {
            Modal.error({
                title: '提示',
                content: '您还没有输入用户名或密码，请重新输入！',
            });
        } else {
            console.log(user, password)
            request.post('http://192.168.26.165:8888/user/login', { params: { account: user, passWord:password }, headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTYwOTk2MjEyfQ._jCmJeSqMrLzXroGkKaLBJKBXGEHbe40ZWrvCJHeLDY' } }).then(res => {
                console.log(res)
                router.push('/Text/Text')
            }).errorHandler(err => {
                console.log(err)
            })
        }
    }

    onChange(e) {
        this.setState({
            user: e.target.value,
        });
    }

    onChange_p(e) {
        this.setState({
            password: e.target.value,
        });
    }

    render() {
        return (
            <div className={styles.user}>
                <div className={styles.input}>
                    <span className={styles.span}>用户名：</span>
                    <Input
                        placeholder="请输入您的用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={e => this.onChange(e)}
                    />
                </div>
                <div className={styles.input}>
                    <span className={styles.span}>密码：</span>
                    <Input.Password placeholder="请输入密码" onChange={e => this.onChange_p(e)} />
                </div>
                <div className={styles.button}>
                    <Button onClick={this.onSubmit.bind(this)} type="primary">
                        登录
                </Button></div>
            </div>
        )
    }
}