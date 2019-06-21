import React, { Component } from 'react';
import { Input, Button, Table, Divider, Tag, Modal, Tabs, Menu} from 'antd';
const SubMenu = Menu.SubMenu;
import router from 'umi/router';
import request, { extend } from 'umi-request';
import styles from './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.location.query.data,
      data: [],
      visible: false,
      visible_a: false,
      small: "Small",
      collapsed: false,
      NavigationList:[{
        id:'1',
        name:'sub1',
        children:[{
          id:'2',
          name:'ssub1',
          children:[{
            id:'3',
            name:'dsub1'
          }]
        }]
      },
      {
        id:'4',
        name:'ddd'
      },
      {
        id:'5',
        name:'sss',
        children:[{
          id:'6',
          name:'fff'
        }]
      }
    ]
    };
  }

  componentDidMount() {
    // this.getList()
  }

  getList() {
    request.post('http://192.168.26.165:8888/category/categoryList', { params: { domainName: this.state.list.领域 }, headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTYwOTk2MjEyfQ._jCmJeSqMrLzXroGkKaLBJKBXGEHbe40ZWrvCJHeLDY' } }).then(res => {
      console.log(res)
      const list = res.data

      // this.setState({
      //   data:list
      // })
    }).catch(err => {
      console.log(err)
    })
  }

  onSearch = value => {
    console.log(value);
  };

  //添加
  onNew() { }

  //统计
  onCensus() {
    this.setState({
      visible: true
    })
  }

  //同义词
  onSynonym() {
    this.setState({
      visible_a: true
    })
  }

  //修改
  onManage(value) {
    console.log(value);
    router.push({
      pathname: './Manage/Revise',
      query: {
        data: value,
      },
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCancel_a = () => {
    this.setState({ visible_a: false });
  };

  //生成
  handleOk = () => {

  }

  //删除
  onDelate() {}

  //动态加载导航菜单
  sidebarMenu(menuData){
    let submenuIndex = 0; //累计的每一项展开菜单索引
    let menu = [];
    const create = (menuData,el)=>{
      for(let i=0;i<menuData.length;i++){
        if(menuData[i].children){  //如果有子级菜单
          let children = [];
          create(menuData[i].children,children);
          submenuIndex++;
          el.push(
            <SubMenu
              key={`sub${submenuIndex}`}
              title={menuData[i].name}
            >
              {children}
            </SubMenu>
          )
        }else{   //如果没有子级菜单
          el.push(
            <Menu.Item key={menuData[i].id} title={menuData[i].name}>
              {menuData[i].name}
            </Menu.Item>
          )
        }
      }
    };
    create(menuData,menu);
    return menu;
  }

  render() {
    const Search = Input.Search;
    const columns = [
      { title: '序号', dataIndex: 'number', key: 'number', },
      { title: '领域', dataIndex: 'realm', key: 'realm', },
      { title: '问题ID', dataIndex: 'quID', key: 'quID', },
      { title: '问题', dataIndex: 'question', key: 'question', },
      { title: '答案', dataIndex: 'answer', key: 'answer', },
      { title: '属性', dataIndex: 'nature', key: 'nature', },
      {
        title: '操作', key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.onManage.bind(this, record)}>
              修改
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.onDelate.bind(this)}>
              删除
            </a>
          </span>
        ),
      },
    ];

    const columns_a = [
      { title: '序号', dataIndex: 'number', key: 'number', },
      { title: '分类', dataIndex: 'number_a', key: 'number_a', },
      { title: '问题', dataIndex: 'question', key: 'question', },
      { title: '语义模板数量', dataIndex: 'mould', key: 'mould', }
    ]

    const columns_b = [
      { title: '序号', dataIndex: 'number', key: 'number', },
      { title: 'WORD', dataIndex: 'word', key: 'word', }
    ]

    const columns_c = [
      { title: '序号', dataIndex: 'number', key: 'number', },
      { title: 'WORD', dataIndex: 'word', key: 'word', },
      { title: 'SYNONYM', dataIndex: 'synonym', key: 'synonym', }
    ]

    const { TabPane } = Tabs;

    return (
      <div className={styles.cont}>
        <div className={styles.cont_a}>
          <Menu
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
          >
            {this.sidebarMenu(this.state.NavigationList)}
          </Menu>
        </div>
        <div className={styles.cont_b}>
          <div className={styles.container}>
            <span>问题：</span>
            <Search placeholder="" onSearch={this.onSearch.bind(this)} style={{ width: 300 }} />
          </div>
          <div className={styles.tab_cont}>
            <div className={styles.list}>
              <Button onClick={this.onNew.bind(this)} type="primary">
                单条添加
            </Button>
              <Button onClick={this.onCensus.bind(this)} type="primary">
                统计
            </Button>
              <Button onClick={this.onSynonym.bind(this)} type="primary">
                同义词
            </Button>
            </div>
            <Table
              className={styles.table}
              columns={columns}
              dataSource={this.state.data}
              bordered={true}
            />
          </div>
          <Modal
            visible={this.state.visible}
            title="统计"
            onCancel={this.handleCancel.bind(this)}
            footer={null}
          >
            <Table
              className={styles.table}
              columns={columns_a}
              dataSource={this.state.data_a}
              bordered={true}
            />
          </Modal>
          <Modal
            visible={this.state.visible_a}
            title="同义词"
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel_a.bind(this)}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                生成
            </Button>,
              <Button key="back" onClick={this.handleCancel_a.bind(this)}>
                返回
          </Button>,
            ]}
          >
            <Tabs defaultActiveKey="1" size={this.state.small}>
              <TabPane tab="专业词典" key="1">
                <Table
                  className={styles.table}
                  columns={columns_b}
                  dataSource={this.state.data_b}
                  bordered={true}
                />
              </TabPane>
              <TabPane tab="同义词典" key="2">
                <Table
                  className={styles.table}
                  columns={columns_c}
                  dataSource={this.state.data_c}
                  bordered={true}
                />
              </TabPane>
            </Tabs>
          </Modal>
        </div>
      </div>
    );
  }
}
