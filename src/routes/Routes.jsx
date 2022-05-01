import  {useParams} from "react-router-dom";

export function Show() {
    console.log("showed");
    let { id } = useParams();

    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
}

export function Add() {
    console.log("added");
    return (
        <div>
            <h1>Added</h1>
        </div>
    )
}