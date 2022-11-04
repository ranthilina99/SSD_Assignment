// import React, { Component } from 'react';
// import DownShift from 'downshift';
// import { withApollo } from 'react-apollo';
// import fetchSuggestions from './fetchSuggestions';
// import axios from "axios";
// import {SERVER_ADDRESS} from "../../../Constants/Constants";
//
// class SearchBar extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             input: '',
//             users: []
//         }
//     }
//     componentDidMount() {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             this.setState({
//                 user: null
//             });
//             return;
//         }
//         this.setState({
//             token:token
//         })
//
//         axios({
//             method: 'get',
//             url: SERVER_ADDRESS+'/users/all',
//             headers: {
//                 Authorization: token
//             },
//             data: {}
//
//         }).then(res => {
//             this.setState({
//                 users: res.data,
//                 isLoggedIn: true
//             })
//         }).catch(err => {
//             console.log(err.message);
//         })
//     }
//
//     onChange(selectedItem){
//         this.setState({input: selectedItem});
//     }
//     async onInputValueChange(input){
//         await this.setState({input});
//         const results = await this.props.client.query({
//             query: fetchSuggestions,
//             variables: {
//                 input: this.state.input
//             }
//         });
//         this.setState({users: results.data.suggestions});
//     }
//     render(){
//         return (
//             <DownShift
//                 inputValue={this.state.input}
//                 onChange={this.onChange.bind(this)}
//                 onInputValueChange={this.onInputValueChange.bind(this)}
//                 render={({getInputProps,getItemProps,isOpen, selectedItem,highlightedIndex})=>(
//                     <div>
//                         <input placeholder={'Start typing..'}  {...getInputProps()} type="text"/>
//                         {isOpen?(
//                             <div>
//                                 {this.state.items.map((result,index)=>{
//                                     return (
//                                         <div
//                                             {...getItemProps({item: result})}
//                                             key={result}
//                                             style={{backgroundColor: highlightedIndex === index ? 'rgb(179, 218, 255)' : 'white'}}
//                                         >
//                                             {result}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         ):null}
//                     </div>
//                 )}
//             />
//         );
//     }
// }
//
// export default withApollo(SearchBar);