import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Admin() {

    let { id } = useParams();

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [posts, setPosts] = useState([]);

    const [status, setStatus] = useState(null);
    const [initialLoadError, setInitialLoadError] = useState(null);

    const [posts, setPosts] = useState({ name: undefined, school_code: undefined, address: undefined });
    const hs = { Accept: "application/json", "Content-Type": "application/json" };
    const url = `http://localhost:8000/api/post`;


    //loading data from API
    useEffect(() => {
        fetch("http://localhost:8000/api/posts")
            .then((res) => res.json())
            .then(
                (res) => {
                    setPosts(res);
                    setIsLoaded(true);
                },
                (err) => {
                    setError(err);
                    setIsLoaded(true);
                }
            );
    }, []);

    //delete
    const deletePost = (id, e) => {
        fetch("http://localhost:8000/api/posts/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        }).then(
            (res) => {
                if (res.status === 200) {
                    const remaining = posts.filter((p) => id !== p.id);
                    setPosts(remaining);
                } else if (res.status === 401) {
                    setError({ message: res.statusText });
                }
            },
            (err) => {
                console.log(err);
                setError(err);
                setIsLoaded(true);
            }
        );
    };

    //create funkcija
    const createItem = (e) => {
        e.preventDefault();
        fetch(url, { method: "POST", headers: hs, body: JSON.stringify(posts) }).then(
            (res) => {
                if (res.status === 200 || res.status === 201) {
                    setStatus({ message: res.statusText });
                } else if (res.status === 401) {
                    setStatus({ message: res.statusText });
                } else if (res.status === 422) {
                    setStatus({ message: res.statusText });
                }
            },
            (err) => {
                setStatus(err);
            }
        );
    };
    // Update edit funkcija
    const updateItem = (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, { method: "PUT", headers: hs, body: JSON.stringify(posts) }).then(
            (res) => {
                if (res.status === 200) {
                    setStatus({ message: res.statusText });
                } else if (res.status === 401) {
                    setStatus({ message: res.statusText });
                } else if (res.status === 422) {
                    setStatus({ message: res.statusText });
                }
            },
            (err) => {
                setStatus(err);
            }
        );
    };



    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>School name</th>
                        <th>School id</th>
                        <th>School address</th>
                        <th>
                            <span className="float-end mx-1">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td className="col-lg-3">{post.name}</td>
                            <td className="col-lg-3">{post.school_code}</td>
                            <td className="col-lg-3">{post.address}</td>

                            <td className="col-lg-2" style={{ minWidth: "200px" }}>
                                <button
                                    onClick={(e) => navigate(`/posts/${post.id}`)}
                                    className="float-end btn btn-warning mx-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => deletePost(post.id, e)}
                                    className="float-end btn btn-danger mx-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3"></td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="border border-3 border-start-0 border-bottom-0 border-end-0">
                            <button
                                onClick={(e) => navigate(`/posts/create`)}
                                className="btn btn btn-success float-end mx-1"
                            >
                                Add scholl
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );




    }


    //atvaizdavimo formos logika


};


export default Admin;