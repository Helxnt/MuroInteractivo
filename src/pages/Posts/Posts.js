import { useEffect, useState } from "react";
import firebase from "../../firebase";
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Posts() {
    const [values, setValues] = useState({
        posts: ""
    });
    const [posts, setPosts] = useState([]);
   
    const getData = async () => {
        const getPost = [];
        const db = firebase.firestore().collection("Posts").orderBy("createdAt", "asc")
            .onSnapshot((query) => {
                query.forEach((doc) => {
                    getPost.push({
                        ...doc.data(),
                        key: doc.idPosts,
                    });
                    setPosts(getPost);
                });
            });
        return () => db();
    };

    const handleSubmission = async (e) => {
        e.preventDefault();

        const user = firebase.auth().currentUser;
        if (user) {
            if (!values.posts) {
                toast.error('Inserta un post.', {
                    position: toast.POSITION.TOP_LEFT
                });
            } else {
                try {
                    let fullName = "";
                    await firebase.firestore().collection("users").doc(user.uid).get()
                        .then((res) => {
                            fullName = res.data().name + " " + res.data().lastname;
                            let createdAt = moment().format("DD/MM/YYYY HH:mm:ss A");

                            const newCityRef = firebase.firestore().collection('Posts').doc();
                        newCityRef.set({
                            idPosts: newCityRef.id,
                            idUser: user.uid,
                            fullName: fullName,
                            post: values.posts,
                            createdAt: createdAt,
                        })
                            .then((docRef) => {
                                toast.success('Se publicó con éxito.', {
                                    position: toast.POSITION.TOP_LEFT
                                });
                                getData();
                            })
                            .catch((error) => {
                                console.error("Error", error);
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            toast.error('Inicia sesión.', {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container" style={{marginTop: "15px"}}>
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: "#d1d1d1" }}>
                        <div className="card-body">
                            <div className="col-md-12">
                                <textarea type="text" rows="4" onChange={(event) => setValues((prev) => ({ ...prev, posts: event.target.value }))} value={values.posts} className="form-control" style={{ backgroundColor: "#f1f1f1", color: "#0f0f0f" }} id="exampleFormControlInput1" placeholder="Escribe un nuevo post." />
                            </div>
                        </div>
                            <div className="d-grid gap-2 col-11 d-flex justify-content-end">                           
                                <input type="button" onClick={handleSubmission} className="btn btn-success" value="Publicar" />                          
                            </div>
                            <br />
                    </div>
                </div>
            </div>
            <br />
            {posts.length > 0 && (
                posts.map((post) =>
                    <div className="container">
                        <div className="row justify-content-center" style={{border: "none"}}>
                            <div className="col-md-6">
                                    <div className="card" style={{ width: "18rem;", backgroundColor: "#939597"}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="d-flex justify-content-start">
                                                    <div className="p-2">
                                                        <h5 className="card-title" style={{ color: "#000000", marginRight: "15px" }}>{post.fullName}<label htmlFor="" style={{ color: "#354235", marginLeft: "10px" }}>{post.createdAt}</label></h5>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="col-md-12">
                                                <p className="card-text" style={{ color: "#F8F4F4" }}>{post.post}</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default Posts