import { useEffect } from "react";
import { useState } from "react";
import { label, topMargin, clearButton } from "../styles"
import Menu from "./Menu";
import Loader from "./Loader";


const HomeView = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [recents, setRecents] = useState([]);
    const [myLists, setMyLists] = useState([]);
    
    useEffect( () => {
        async function fetchData() {
            setIsLoading(true)
            const getMyListsAsync = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: localStorage.getItem('username') })
                };
            
                const response = await fetch('https://0xo69ga71b.execute-api.us-west-1.amazonaws.com/dev/mylists', requestOptions);
                const json = await response.json();                
                setIsLoading(false)
                return json.body
            }

            const response = await getMyListsAsync();
            let json = JSON.parse(response);

            setMyLists(json.myLists);
            setRecents(json.recentlyViewed);
        }
        fetchData();
    }, []);

    const MyListItem = (props) => {
        return <tr>
            <td><button style={clearButton} onClick={() => props.navigate('/view/' + props.item.listId)}>{props.item.listId}</button></td>
            <td>{props.item.createdAt.substring(0,16)}</td>
        </tr>
    }

    const RecentListItem = (props) => {
        return <tr>
            <td><button style={clearButton} onClick={() => props.navigate('/view/' + props.item.listId)}>{props.item.listId}</button></td>
            <td>{props.item.createdBy}</td>
            <td>{props.item.viewedAt.substring(0,16)}</td>
        </tr>
    }

    const Page = () => {
        return (
            <div>
                <Menu navigate={props.navigate} selected="home_button"/>
                <div style={topMargin}>
                    <span style={label}>Recently Viewed</span>
                </div>
                <div className="scroll">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Last Opened</th>
                        </tr>
                        </thead>
                        <tbody>
                        { recents.map((item) => (
                            <RecentListItem item={item} key={item.listId} navigate={props.navigate}/>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={topMargin}>
                    <span style={label}>Created By Me</span>
                </div>
                <div className="scroll">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Creation Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        { myLists.map((item) => (
                            <MyListItem item={item} key={item.listId} navigate={props.navigate}/>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={topMargin}></div>
            </div>
        );
    }

    return (isLoading ? <Loader/> : <Page/>)
}

export default HomeView;