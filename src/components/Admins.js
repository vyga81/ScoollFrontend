import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Admins = () => {

    let { id } = useParams();

    const [status, setStatus] = useState(null);
    const [initialLoadError, setInitialLoadError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState({ name: undefined, school_code: undefined, address: undefined });
    const hs = { Accept: "application/json", "Content-Type": "application/json" };
    const url = `http://localhost:8000/api/post`;

    useEffect(() => {
        if (id)
            fetch(`${url}/${id}`)
                .then((res) => res.json())
                .then(
                    (res) => {
                        setPost(res);
                        setIsLoaded(true);
                    },
                    (err) => {
                        setInitialLoadError(err);
                        setIsLoaded(true);
                    }
                );
        else setIsLoaded(true);
    }, [id, url]);

    //create funkcija
    const createItem = (e) => {
        e.preventDefault();
        fetch(url, { method: "POST", headers: hs, body: JSON.stringify(post) }).then(
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
        fetch(`${url}/${id}`, { method: "PUT", headers: hs, body: JSON.stringify(post) }).then(
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
    //atvaizdavimo formos logika

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (initialLoadError) {
        return <div>Error: {initialLoadError.message}</div>;
    } else {
        return (
            <div className="d-flex aligns-items-center justify-content-center">
                <div className="card w-50">
                    <div className='card-header'>Hotel {id ? `nr:${id} edit` : `creation`} page</div>
                    <div className="card-body">
                        <form onSubmit={(e) => (id ? updateItem(e) : createItem(e))}>
                            <div className="my-2 text-danger">{status === null ? "" : status.message}</div>
                            <div className="form-group d-grid gap-2">
                                <input
                                    className="form-control"
                                    onChange={(e) => setPost({ ...post, name: e.target.value })}
                                    onFocus={() => post.name ?? setPost({ ...post, name: "" })}
                                    value={post.name ?? "Hotel name"}
                                />
                                <textarea
                                    className="form-control"
                                    onChange={(e) => setPost({ ...post, country: e.target.value })}
                                    onFocus={() => post.country ?? setPost({ ...post, country: "" })}
                                    value={post.country ?? "Change country name"}
                                />
                                <textarea
                                    className="form-control"
                                    onChange={(e) => setPost({ ...post, price: e.target.value })}
                                    onFocus={() => post.price ?? setPost({ ...post, price: "" })}
                                    value={post.price ?? "Set new price"}
                                />
                                <textarea
                                    className="form-control"
                                    onChange={(e) => setPost({ ...post, picture: e.target.value })}
                                    onFocus={() => post.picture ?? setPost({ ...post, picture: "" })}
                                    value={post.picture ?? "Set new picture"}
                                />
                                <textarea
                                    className="form-control"
                                    onChange={(e) => setPost({ ...post, nights: e.target.value })}
                                    onFocus={() => post.nights ?? setPost({ ...post, nights: "" })}
                                    value={post.nights ?? "Add nights"}
                                />
                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};


export default Admins;