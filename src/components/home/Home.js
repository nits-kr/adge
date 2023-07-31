import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCopy,
  faDownload,
  faFile,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Navbar from "../Navbar";
import { useGetAllPostHomeQuery } from "../../services/Post";
import { useCreateFormMutation } from "../../services/Post";
import { useViewDetailsMutation } from "../../services/Post";
import { useUpdateDuplicateMutation } from "../../services/Post";
import { useAdgeHomeSubmitMutation } from "../../services/Post";
import { useDeleteHomeFormMutation } from "../../services/Post";

import { useForm } from "react-hook-form";

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const [createForm] = useCreateFormMutation();
  const [viewDetails] = useViewDetailsMutation();
  const [updateDuplicate] = useUpdateDuplicateMutation();
  const [homeSubmit, res] = useAdgeHomeSubmitMutation();
  const [deleteForm, r] = useDeleteHomeFormMutation();
  // console.log("useViewDetailsMutation", useViewDetailsMutation);
  console.log("create form", createForm);
  console.log("create form details", createForm?.data?.results?.saveData);
  const blog = useGetAllPostHomeQuery();
  const [title, setTitle] = useState("");
  const [itemId, setItemId] = useState("");
  const [title2, setTitle2] = useState("");
  const [title5, setTitle5] = useState("");
  const [itemId2, setItemId2] = useState("");
  console.log("itemId2", itemId2);
  const [itemId3, setItemId3] = useState("");
  const [titleError, setTitleError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [userName, setUserName] = useState("");
  const [scheduledList, setScheduledList] = useState();
  const handleEdit = (currentItem) => {
    setTitle5(currentItem?.title || "");
  };
  useEffect(() => {
    if (blog?.data?.results) {
      setScheduledList(blog?.data?.results);
    } else {
      setScheduledList(blog?.data?.results);
    }
  }, [blog]);
  const navigate = useNavigate()
  console.log("scheduled data list", scheduledList);
  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    setTitleError("");
    setUserNameError("");
    if (title.trim() === "") {
      setTitleError("Title is required.");
      return;
    }
    if (userName.trim() === "") {
      setUserNameError("Username is required.");
      return;
    }
    const editAddress = {
      title: title,
      userName: userName,
    };
    try {
      const response = await createForm(editAddress);
      const generatedId = response?.data?.results?.saveData?._id;
      console.log("generatedId", generatedId);
      localStorage.setItem("generatedId", generatedId);

      Swal.fire({
        title: "Form Created",
        text: "The form has been successfully created.",
        icon: "success",
      }).then(() => {
        // window.location.reload(); // Reload the page
        navigate("/adge/adge-question")
        window.location.reload();
      });
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSaveChanges2();
    }, 1000);

    return () => clearTimeout(timer);
  }, [itemId]);
  // useEffect(() => {
  //   handleSaveChanges2()
  // },[itemId])
  useEffect(() => {
    if (res.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your submission has been successful.",
        timer: 3000,
        timerProgressBar: true,
        onClose: () => {
          window.location.reload(); // Reload the page
        },
      });
    }
  }, [res.isSuccess]);

  const handleSaveChanges4 = () => {
    const editAddress = {
      id: itemId3,
    };
    homeSubmit(editAddress);
  };

  const handleSubmitOn = () => {
    if (itemId3) {
      handleSaveChanges4();
    }
  };

  console.log("item id 3", itemId3);
  const handleSaveChanges2 = () => {
    const editAddress = {
      id: itemId,
    };
    viewDetails(editAddress);
  };
  console.log(itemId);

  const handleSaveChanges3 = () => {
    console.log("handleSaveChanges1", itemId2);
    const editDuplicate = {
      id: itemId2,
      title: title2,
    };
    updateDuplicate(editDuplicate);
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Navbar />

      <main id="main" className="main">
        <div className="container p-0">
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card StaticCard mt-2 pt-3">
                  <div className="card-body" style={{ flex: "1" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5
                        className="card-title float-start"
                        style={{ marginBottom: "0px", padding: "0px" }}
                      >
                        Home
                      </h5>
                      <div>
                        <button
                          type="button"
                          className="btn btn-sm DefaultBtn float-end"
                          fdprocessedid="bfs61e"
                        >
                          <FontAwesomeIcon icon={faDownload} /> Download
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm DefaultBtn float-end me-2"
                          fdprocessedid="bfs61e"
                        >
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            className="comman_btn2 table_viewbtn"
                            // to="/users"
                          >
                            <FontAwesomeIcon icon={faFile} /> Create Form
                          </Link>
                        </button>
                      </div>
                    </div>
                    <table
                      className="table  table-hover table-striped CustomTable mt-2  "
                      id="UserTable"
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col" >Title</th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Date
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            User
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Score
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Scheduled
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Status
                          </th>
                          <th
                            scope="col"
                            align="center"
                            className="text-end"
                            style={{
                              textAlign: "end !important",
                              width: 280,
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduledList?.list?.map((item, index) => {
                          return (
                            <tr className="heading10 " key={index}>
                              <td
                                scope="row"
                                style={{
                                  backgroundColor: "yellow !important",
                                  textAlign: "start",
                                }}
                              >
                                {item?.uniQ_Id}
                              </td>
                              <td
                                style={{
                                  backgroundColor: "yellow !important",
                                  textAlign: "start",
                                }}
                              >
                                {item?.title}{" "}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item?.createdAt?.slice(0, 10)}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item?.userName}
                              </td>
                              <td style={{ textAlign: "center" }}>NA</td>

                              <td style={{ textAlign: "center" }}>
                                <div className="nav-item dropdown pe-3">
                                  <Link
                                    className=""
                                    to="#"
                                    data-bs-toggle="dropdown"
                                  >
                                    {" "}
                                  </Link>

                                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile text-start">
                                    <li className="dropdown-header">
                                      <div className="form-group text-start">
                                        <small>Scheduled to</small>
                                        <h6 className="text-black">
                                          Mohammed bin Ibrahim
                                        </h6>
                                      </div>
                                      <div className="form-group text-start">
                                        <small>Scheduled date</small>
                                        <h6 className="text-black">
                                          25-06-2023 to 30-06-2023
                                        </h6>
                                      </div>
                                      <div className="form-group text-start">
                                        <small>Owner</small>
                                        <h6 className="text-black">
                                          ADGE Name
                                        </h6>
                                      </div>
                                      <div className="form-group text-start">
                                        <small>User</small>
                                        <h6 className="text-black">POC Name</h6>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item?.status}
                              </td>
                              <td style={{ textAlign: "end" }}>
                                {/* <Link
                                  type="button"
                                  to="#"
                                  // to={`/adge/auditior-question/${item._id}`}
                                  className="btn btn-sm tableBtn-blue mx-1"
                                  // onClick={() => setItemId3(item?._id)}
                                  onClick={() => {
                                    setItemId3(item?._id);
                                    // window.location.href = `/adge/auditior-question/${item._id}`;
                                  }}
                                  // onClick={() => review(item._id)}
                                >
                                  <FontAwesomeIcon icon={faCopy} /> Submit
                                </Link> */}
                                {/* <Link
                                  type="button"
                                  to="#"
                                  className="btn btn-sm tableBtn-blue mx-1"
                                  onClick={() => {
                                    setItemId3(item?._id);
                                    handleSubmitOn();
                                  }}>
                                  <FontAwesomeIcon icon={faCopy} /> Submit
                                </Link> */}

                                <Link
                                  type="button"
                                  to={`/adge/auditior-question/${item._id}`}
                                  className="btn btn-sm tableBtn-blue mx-1"
                                  onClick={() => {
                                    setItemId3(item?._id);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEye} /> View
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-sm tableBtn-Gray mx-1"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#ExtralargeModal"
                                  fdprocessedid="8wai4"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteForm(item?._id);
                                        Swal.fire(
                                          "Deleted!",
                                          `${item?.userName}  item has been deleted.`,
                                          "success"
                                        ).then(() => {
                                          window.location.reload(); // Reload the page
                                        });
                                      }
                                    });
                                  }}
                                  // onClick={() => {
                                  //   setItemId3(item?._id);
                                  // }}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                                {/* <Link
                                  type="button"
                                  to={"/adge/adge-question"}
                                  className="btn btn-sm tableBtn-blue mx-1 bg-grey"
                                  onClick={() => {
                                    setItemId3(item?._id);
                                  }}>
                                  <FontAwesomeIcon icon={faPencil} style={{color: "#ffffff",}} /> Edit
                                </Link> */}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <thead>
                        <tr className="bg-primary">
                          <th
                            scope="col"
                            colSpan={12}
                            style={{
                              padding: "40px 0px 0px 0px !important",
                              fontWeight: "bold !important",
                              fontSize: "15px",
                              backgroundColor: "#5058dd !important",
                            }}
                          >
                            History
                          </th>
                          {/* <th scope="col" colSpan={8}>
                            
                          </th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {scheduledList?.listData?.map((currentItem, index) => {
                          return (
                            <tr key={index}>
                              <td scope="row"> {currentItem?.uniQ_Id} </td>
                              <td>{currentItem.title}</td>
                              <td style={{ textAlign: "center" }}>
                                {currentItem.createdAt?.slice(0, 10)}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {currentItem.userName}
                              </td>
                              <td style={{ textAlign: "center" }}> {currentItem?.score} </td>
                              <td style={{ textAlign: "center" }}>
                                <div className="nav-item dropdown pe-3">
                                  <Link
                                    className=""
                                    to="#"
                                    data-bs-toggle="dropdown"
                                  >
                                    {currentItem.to && currentItem.from
                                      ? `${currentItem.to.slice(
                                          0,
                                          10
                                        )}  To ${currentItem.from.slice(0, 10)}`
                                      : ""}
                                  </Link>

                                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile text-start">
                                    <li className="dropdown-header">
                                      <div className="form-group text-start">
                                        <small>Scheduled to</small>
                                        <h6 className="text-black">
                                          Mohammed bin Ibrahim
                                        </h6>
                                      </div>
                                      <div className="form-group text-start">
                                        <small>Scheduled date</small>
                                        {currentItem.from && currentItem.to ? (
                                          <h6 className="text-black">
                                            {currentItem.from.slice(0, 10)} to{" "}
                                            {currentItem.to.slice(0, 10)}
                                          </h6>
                                        ) : (
                                          <h6 className="text-black">-</h6>
                                        )}
                                      </div>
                                      <div className="form-group text-start">
                                        <small>Owner</small>
                                        <h6 className="text-black">
                                          ADGE Name
                                        </h6>
                                      </div>
                                      <div className="form-group text-start">
                                        <small>User</small>
                                        <h6 className="text-black">POC Name</h6>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </td>

                              <td style={{ textAlign: "center" }}>
                                {currentItem.status}
                              </td>
                              <td style={{ textAlign: "end" }}>
                                <button
                                  type="button"
                                  className="btn btn-sm tableBtn-Gray mx-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ExtralargeModal"
                                  fdprocessedid="8wai4"
                                  onClick={() => {
                                    setItemId2(currentItem?._id);
                                    handleEdit(currentItem);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCopy} /> Duplicate
                                </button>
                                <Link
                                  type="button"
                                  to={`/adge/auditior-questionview/${currentItem._id}`}
                                  className="btn btn-sm tableBtn-blue mx-1"
                                  onClick={() => {
                                    setItemId3(currentItem?._id);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEye} /> View
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Link
        to="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </Link>

      <svg
        id="SvgjsSvg1001"
        width={2}
        height={0}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          overflow: "hidden",
          top: "-100%",
          left: "-100%",
          position: "absolute",
          opacity: 0,
        }}
      >
        <defs id="SvgjsDefs1002" />
        <polyline id="SvgjsPolyline1003" points="0,0" />
        <path id="SvgjsPath1004" d="M0 0 " />
      </svg>

      <div className="modal fade" id="ExtralargeModal" tabIndex={-1}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Duplicate</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" style={{marginTop:"35px"}}>
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-3 col-form-label"
                    style={{ marginTop: "-20px" }}
                  >
                    Title
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputText"
                      // placeholder="Data Management Audit-June2023"
                      defaultValue={title5}
                      onChange={(e) => setTitle2(e.target.value)}
                    />
                  </div>
                </div>
                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-3 pt-0">
                    Need Uploaded Evidences
                  </legend>
                  <div className="col-sm-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck1"
                      />
                      {/* <label className="form-check-label" htmlFor="gridCheck1">
                        Example checkbox
                      </label> */}
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges3}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade Edit_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Create Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
              >
                <div className="form-group col-12">
                  <label htmlFor="nameEn">Title<span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {titleError && (
                    <span className="error-message text-danger">
                      {titleError}
                    </span>
                  )}
                </div>
                <div className="form-group col-12 my-2">
                  <label htmlFor="nameAr">User name <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {userNameError && (
                    <span className="error-message text-danger">
                      {userNameError}
                    </span>
                  )}
                </div>
                <div className="form-group mb-0 col-auto">
                  <Link to="#">
                    <button
                      className="comman_btn2  text-light"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        width: "100px",
                        height: "40px",
                        backgroundColor: "#5058DD",
                      }}
                      onClick={handleSaveChanges1}
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
