import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

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
                                    // onClick={(e) => deletePost(post.id, e)}
                                    className="float-end btn btn-danger mx-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td colspan="3" className="border border-3 border-start-0 border-bottom-0 border-end-0">
                            <button
                                onClick={(e) => navigate(`/posts/create`)}
                                className="btn btn btn-success float-end mx-1"
                            >
                                Add new post
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Admin;