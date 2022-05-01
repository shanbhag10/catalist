import React from 'react';

export default class ResultsPanel extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }
    
      componentDidMount() {
        this.UserList();
      }
    
      UserList() {
        $.getJSON('https://randomuser.me/api/')
          .then(({ results }) => this.setState({ person: results }));
      }
    
}