import React, {useContext, useEffect, useState, useRef} from "react";
import activityContext from "./context";
import Link from "next/link";
import ls from "local-storage";
import {useRouter} from "next/router";
import {
    Bed,
    ImageOutline,
    NavigateCircleOutline,
    ChevronBackOutline,
    HeartOutline,
    BriefcaseOutline,
    ChatboxEllipsesOutline,
    FolderOpenOutline,
    InformationCircleOutline,
    CloseCircle,
    ChevronForwardOutline, RefreshCircleOutline, RefreshOutline, ChatboxOutline
} from "react-ionicons";
import {Avatar, Button, Dropdown, Card, List, Tabs, Menu, Modal, Drawer, Badge} from "antd";
import {GlobalOutlined,WalletOutlined,AppstoreOutlined, LogoutOutlined, UserOutlined, UnlockOutlined} from "@ant-design/icons";
import * as Api from "./api";
const axios = require('axios');
import moment from "moment";
import Firebase from "firebase";
import {toast} from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import {router} from "next/router";



const Logo = ({size,className}) => {

return(
    <div className="d-flex align-items-center">x
                <img className={className} src="/images/logo.svg"
                       style={{
                           width: size === 'large' ? 170 : 30,
                           resizeMode: 'contain',
                       }} />
                       <h6 className="font-white font-sm-2 ms-3 mb-0">Double H</h6>
    </div>

)
}

const Random = (min, max) => Math.floor(Math.random() * (max - min)) + min;


const Empty = (props) => {
    let className = props.className,
        message = props.message,
        title = props.title;
    return(
        <section className={"col-lg-6 col-10 mx-auto text-center py-5 " + className } >

            <img src="https://res.cloudinary.com/avamot/image/upload/v1632774320/brand/icon.png" style={{ width: '100px' }} />
            <h5 className="mt-4">{title}</h5>
            <p className="lead font-sm mt-3 font-gray">{message}</p>
        </section>

    )
}

const Loading = () => {
    return(
        <div className="text-center padding_100">
            <Logo size="large" color="color" />
        </div>
    )
}

function thousandSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


const MessageView = (props) => {
    const context = useContext(activityContext);
    const selector = props.selector
    let moment_tz = require('moment-timezone');
    const [loading, setLoading] = useState(true);
    const [notAllowed, setNotAllowed] = useState([]);
    const [message, setMessage] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [property, setProperty] = useState([]);
    const [reply, setReply] = useState(null);
    const [viewProfile, setViewProfile] = useState(false);
    const messagesEndRef = useRef(null)
    const strtotime = require('locutus/php/datetime/strtotime');
    let firebaseRef = useRef();


    const ScrollToBottom = () => {

        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView(false));
        return <div ref={elementRef} />;
    }


    const firebaseConfig = {
        apiKey: "AIzaSyD3cp72cjj7r5KLQHLy32nnqM8Dz_sEKTg",
        authDomain: "avamot.firebaseapp.com",
        databaseURL: "https://avamot-default-rtdb.firebaseio.com",
        projectId: "avamot",
        storageBucket: "avamot.appspot.com",
        messagingSenderId: "465511959528",
        appId: "1:465511959528:web:9cf6cc5a91bc909dc1325d",
        measurementId: "G-Q7JDFNQ7W7"
    };

    const fetchNotAllowed = async () =>{
        const response2 = await axios({
            method: 'GET',
            url : Api.notAllowedKeywords,
        });

        if(response2.data.status === 'success') {
            setNotAllowed(Object.values(response2.data.data));
        }
    }

    function markAsRead() {

        let data = new FormData();
        data.append('property', selector);

        axios({
            method: 'POST',
            url: Api.markAsRead + '/' + context.user.first_name,
            data: data,
            headers: {
                Authorization: 'Bearer ' + ls.get('4vam07')
            }
        }).then((response) => {

            if (response.data.status === 'error') {

                toast.error(response.data.message);
            }

        })
    }

    async function getProperty() {
        //setLoading(true);

        const response = await axios({
            method: 'GET',
            url: Api.property + '/' + selector,
            headers: {
                Authorization: 'Bearer ' + ls.get('4vam07'),
            },
        }).catch((e) => {
            setLoading(false);
        })


        if (response.data.status === 'success') {
            console.log(response.data.data);
            setProperty(response.data.data);
            setLoading(false);
        } else {
            console.log(response.data.message);

        }

    }


    const getMessages = async (snapshot) => {

    //setLoading(true);

            let keys = Object.keys(snapshot.val());
            let newArr = [];

            //console.log(selector);
            let snapshot_ref = (snapshot.ref._delegate._path.pieces_);

            if(selector === snapshot_ref.toString()) {


                keys.forEach((dkey) => {
                    newArr.push({
                        date: snapshot.val()[dkey].date,
                        message: snapshot.val()[dkey].message,
                        sender: snapshot.val()[dkey].sender,
                        reply: snapshot.val()[dkey].reply,
                        status: snapshot.val()[dkey].status,
                    });
                })

                setChatMessages(newArr);
                markAsRead();
                //scrollToBottom();
            }


    }


    const sendChat = (e) => {
        e.preventDefault();

        if(message !== null && message !== '' && message.trim() !== '') {

            var keywordsFound = notAllowed.filter(item => message.toLowerCase().includes(item));

            if(keywordsFound.length <= 0 ) {


                let data = new FormData();
                data.append('property', selector);
                data.append('message', message);
                data.append('reply', reply);

                let pendingData = {
                    status : 'pending',
                    sender : context.user.selector === property.user.selector ? context.user.first_name + ' '+ context.user.last_name : 'Landlord',
                    message : message,
                    reply : reply,
                    date: strtotime('now')
                    // date: {
                    //     date: new Date(),
                    //     timezone: "Africa/Lagos",
                    //     timezone_type: 3
                    // }
                }

                let all = chatMessages;
                all.push(pendingData);


                setChatMessages(all);
                setMessage('');
                setReply(null);


                axios({
                    method: 'POST',
                    url: Api.sendChat,
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + ls.get('4vam07')
                    }
                }).then((response) => {

                    //console.log(response.data);

                    if (response.data.status === 'error') {

                        toast.error(response.data.message)

                    }

                })
            }else{
                toast.error('Message is not allowed');
            }

        }else{
            toast.error('Type a message before sending');

        }
    }

    const actionMenu = (
        <Menu>
            <Menu.Item onClick={() => setViewProfile(true)}>
                    View Profile
            </Menu.Item>
            {
                property.status === 'request' && (
                    <Menu.Item>
                        <Link href="/dashboard/landlord/requests">
                            View Purchase Request
                        </Link>
                    </Menu.Item>
                )
            }

        </Menu>
    );

    useEffect(() => {
        if (selector !== null) {
            getProperty();
            fetchNotAllowed();
            setChatMessages([]);
            setReply(null)

            if (Firebase.apps.length === 0) {
                Firebase.initializeApp(firebaseConfig);
            } else {
                Firebase.app();
            }

            firebaseRef = Firebase.database().ref(selector);

            firebaseRef.on("value", getMessages)

            //getMessages();

            return () => {
                firebaseRef.off()
            }
        }


    }, [props.selector])
    return (
        selector === null ? (
            <div className="h-100 d-flex align-items-center">
                <Empty title="Select a message"
                       message="Select a one of the messages from your list of conversations to continue"/>
            </div>
        ) : (
            <div>
                {
                    loading ? (
                        <div className="bg-white p-3 h-90">
                            <Skeleton height="30px" width="50%" className="mb-1"/> <br/>
                            <Skeleton height="20px" width="25%" className="mb-3"/>
                            <Skeleton height="66vh" className="bg-white"/>
                            <Skeleton height="50px" className="rounded-pill mt-3"/>
                        </div>
                    ) : (
                        <div className="bg-white p-3 chatbox">
                            <div className="pt-1 d-flex align-items-center justify-content-between">
                                <div className="me-2">
                            <h5 className="m-0">{property.listing.name}</h5>
                            <p className="text-primary m-0">{property.listing.state.name}, {property.listing.location.name}</p>
                                </div>

                                <Dropdown overlay={actionMenu} placement="bottomRight">
                                    <Button><InformationCircleOutline size={50} /></Button>
                                </Dropdown>
                            </div>

                            <div className="chatarea" >
                                {
                                    chatMessages.length >= 1 ? (
                                        chatMessages.map((msg, index) => (
                                            msg.message.trim() !== '' && msg.message.trim() !== null ?(
                                                msg.sender === 'Avamot' ? (
                                                    index >= 1 ? (
                                                            <div className="animated slideInUp my-5 p-2 bg-white border rounded-3">

                                                                <div className='bg-white text-center'>
                                                                    <Logo size="small" color="color" />
                                                                </div>

                                                                <div className="col-lg-8 mx-auto">
                                                                <p className="font-gray mt-3 m-0 font-sm text-center">{msg.message}</p>

                                                                <p className="text-center m-0 text-primary">
                                                                    {moment(msg.date.date).calendar(null, {
                                                                        sameDay: '[Today]',
                                                                        nextDay: '[Tomorrow]',
                                                                        nextWeek: 'dddd',
                                                                        lastDay: '[Yesterday]',
                                                                        lastWeek: '[Last] dddd',
                                                                        sameElse: 'DD/MM/YYYY'
                                                                    }) + ', ' + moment_tz(msg.date.date).tz(moment_tz.tz.guess()).format('H:m')}
                                                                </p>
                                                                </div>
                                                            </div>
                                                    ):null

                                                ): msg.sender === 'Landlord' ? (
                                                    <div className="mb-3 chat_container">
                                                    <div className="chat_bubble multiline">
                                                        {
                                                                                msg.reply !== null && msg.reply !== 'null' && msg.reply !== undefined ? (
                                                                                    <div className="bg-gray p-2 reply_border rounded mb-3">
                                                                                        <p className="font-xxs m-0 multiline">{msg.reply}</p>
                                                                                    </div>
                                                                                ):null
                                                        }
                                                        {msg.message}

                                                        <p className="mt-2 mb-0 font-xxs font-gray">{
                                                            msg.status === 'pending' ?(
                                                                'sending'
                                                            ): (
                                                                moment.unix(msg.date).fromNow()
                                                            )
                                                        }</p>
                                                    </div>
                                                        <a onClick={() => setReply(msg.sender + '\n \n' + msg.message)} className="reply_link font-xxs text-primary">Reply</a>
                                                    </div>

                                                ):(
                                                    <div className="mb-3 text-end chat_container">
                                                        <div className="chat_bubble_2 ms-auto text-start font-white multiline">
                                                            {
                                                                msg.reply !== null && msg.reply !== 'null' && msg.reply !== undefined ? (
                                                                    <div className="bg-primary_transparent p-2 reply_border rounded mb-3">
                                                                        <p className="font-xxs font-black m-0 multiline">{msg.reply}</p>
                                                                    </div>
                                                                ):null
                                                            }
                                                            {msg.message}

                                                            <p className="mt-2 mb-0 font-xxs text-primary_transparent">{
                                                                msg.status === 'pending' ?(
                                                                    'sending'
                                                                ): (
                                                                   moment.unix(msg.date).fromNow()
                                                                )
                                                            }</p>
                                                        </div>
                                                        <a onClick={() => setReply(msg.sender + '\n \n' + msg.message)} className="reply_link font-xxs text-primary">Reply</a>
                                                    </div>

                                                )
                                            ):null
                                        ))


                                    ):(
                                       <div className="lead text-center p-5">
                                           Send a message below to begin this conversation
                                        </div>

                                    )
                                }

                                <ScrollToBottom />
                            </div>

                            <div className="message_form bg-white">
                                {
                                    reply !== null ?(
                                        <div className="bg-white align-items-center py-1 px-4 d-flex justify-content-between">

                                           <div className="chat_bubble multiline font-xxs">
                                            {reply}
                                           </div>
                                            <CloseCircle className="cursor-pointer" onClick={() => setReply(null)} />
                                        </div>
                                    ):null
                                }
                                <form onSubmit={sendChat}>
                                <div className="border rounded-pill py-1 px-2 ps-4 d-flex align-items-center justify-content-between">

                                    <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} autoComplete="off" name="message" className="no_border font-xs w-100 me-3 no_outline form-control-sm p-2" placeholder="Enter a message" />
                                    <button className="btn btn-primary btn-rounded rounded-pill"><i className="fa fa-paper-plane"></i></button>

                                </div>
                                </form>
                            </div>

                            <Modal title={property.user.first_name + ' profile'} onCancel={() => setViewProfile(false)} visible={viewProfile} footer={null}>
                                <div className="border-bottom d-flex justify-content-between mb-3">
                                    <p>First name</p>
                                    <p>{property.user.first_name}</p>
                                </div>

                                <div className="border-bottom d-flex justify-content-between mb-3">
                                    <p>Last name</p>
                                    <p>{property.user.last_name}</p>
                                </div>

                                <div className="border-bottom d-flex justify-content-between mb-3">
                                    <p>Gender</p>
                                    <p>{property.user.gender}</p>
                                </div>

                                <div className="border-bottom d-flex justify-content-between mb-3">
                                    <p>Date of birth</p>
                                    <p>{moment().diff(moment(property.user.dob.date, 'YYYY-MM-DD H:i:s'), 'years')} years old</p>
                                </div>

                                <div className="border-bottom d-flex justify-content-between mb-3">
                                    <p>Member since</p>
                                    <p>{moment(property.user.registrationDate.date, 'YYYY-MM-DD H:i:s').fromNow()}</p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p>Verified</p>
                                    <p> {
                                        property.user.verified ?
                                            <p className="text-success">Yes</p> :
                                            <p className="text-danger">No</p>
                                    }</p>
                                </div>

                            </Modal>
                        </div>
                    )
                }
            </div>
        )

    )
}

const Nav = (props) => {
    let pageTitle = props.pageTitle;
    const context = useContext(activityContext);
    const router = useRouter();
    const {SubMenu} = Menu;

    if(ls.get('4vam07')) {
        return (
            <section className="border-top">
                <div className="p-3 mb-3 ">
                    <div className="row align-items-center mb-3">
                        <div className="col-3">
                            <Avatar className="bg-primary me-3 text-uppercase"
                                    size='large'>{context.user.first_name && context.user.first_name.charAt(0)}</Avatar>
                        </div>
                        <div className="col-9">
                            <h6 className="font-weight-500 font-xs-2 m-0">{context.user.first_name} {context.user.last_name && context.user.last_name.charAt(0) + "."}</h6>
                            <p className="text-primary font-xs text-capitalize m-0">
                                {context.user.first_name && context.user.roles.includes('ROLE_LANDLORD') ? 'Landlord' : 'User'}

                            </p>
                        </div>
                    </div>

                    <Link href="/">
                    <Button icon={<ChevronBackOutline />}>Back to website</Button>
                    </Link>

                </div>
                <Menu theme="light" mode="inline" selectedKeys={pageTitle}>

                    <Menu.Item key="Dashboard" icon={<GlobalOutlined style={{width:20}}/>}>
                        <Link href="/dashboard/">
                        Dashboard
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="My Properties" icon={<BriefcaseOutline style={{width:20}}/>}>
                        <Link href="/dashboard/properties">
                            <a>
                                <Badge
                                    count={parseInt(context.notifications.properties_request) + parseInt(context.notifications.properties_pending)}
                                    className="float-end mt-2"
                                />
                            My Properties
                            </a>
                        </Link>
                    </Menu.Item>


                    {
                        context.user.first_name && context.user.roles.includes('ROLE_LANDLORD') ? (
                            <SubMenu key="sub2" icon={<ChatboxEllipsesOutline className="me-2" style={{width:20}}/>} title="Messages">
                                <Menu.Item key="Messages">
                                    <Link href="/dashboard/messages">User Messages</Link>
                                    </Menu.Item>

                                <Menu.Item key="Landlord Messages">
                                    <Link href="/dashboard/landlord_messages">Landlord Messages</Link>
                                </Menu.Item>
                            </SubMenu>
                        ):(
                        <Menu.Item key="Messages" icon={<ChatboxEllipsesOutline style={{width:20}}/>}>
                        <Link href="/dashboard/messages">
                        Messages
                        </Link>
                        </Menu.Item>
                        )
                    }

                    <Menu.Item key="Favorites" icon={<HeartOutline style={{width:20}}/>}>
                        <Link href="/dashboard/favorites">
                            Favorites
                        </Link>
                    </Menu.Item>


                    {
                        context.user.first_name && context.user.roles.includes('ROLE_LANDLORD') && (
                            <Menu.ItemGroup key="properties_area" title="Property Management">
                                <Menu.Item key="Requests" icon={<ChatboxOutline style={{width:20}}/>}>
                                    <Link href="/dashboard/landlord/requests">
                                        <a>
                                        <Badge
                                            count={context.notifications.requests}
                                            className="float-end mt-2"
                                        />
                                    Requests
                                        </a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="My Listings" icon={<AppstoreOutlined style={{width:20}}/>}
                                           onClick={() => router.push('/dashboard/landlord/listings')}>
                                    <a >
                                        <Badge
                                            count={context.notifications.listings}
                                            className="float-end mt-2"
                                            style={{ backgroundColor: '#0c8665' }}
                                        />
                                    My Listings

                                    </a>
                                </Menu.Item>
                                <Menu.Item key="Payout" icon={<WalletOutlined style={{width:20}}/>}>
                                    <Link href="/dashboard/landlord/payout">
                                        <a>
                                            <Badge
                                                count={context.notifications.payout}
                                                className="float-end mt-2"
                                            />

                                    Payout
                                        </a>
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        )
                    }



                    <Menu.ItemGroup key="preference_area" title="Preferences">


                        <Menu.Item key="My Profile" icon={<UserOutlined style={{width:20}}/>}>
                            <Link href="/dashboard/profile">
                                <a>My Profile
                                    {
                                        context.user.phone && context.user.address && context.user.first_name && context.user.last_name && context.user.email ?null:(
                                            <InformationCircleOutline className="float-end" color="red" />
                                        )
                                    }
                                </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<UnlockOutlined style={{width:20}}/>} key="Security" >
                            <Link href="/dashboard/security">
                            Security
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<FolderOpenOutline style={{width:20}} />}  key="KYC" >
                            <Link href="/dashboard/kyc">
                                <a>KYC
                                    {
                                        context.user.verified ? null :(
                                            <InformationCircleOutline className="float-end" color="red" />
                                        )
                                    }
                                    </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<LogoutOutlined style={{width:20}}/>} onClick={() => context.logout()}>
                            Logout
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </section>
        )
    }else{
        return null;
    }
};


const DashboardSidePanel = (props) => {
    const {TabPane} = Tabs;
    const context = useContext(activityContext);
    const [tabPosition, setTopPosition] = useState(1);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [listing, setListing] = useState([]);


    const changeTabPosition = (value) => {
        setTopPosition(value)
    }

    const getNotifications = async () => {

        const response = await axios({
            method: 'GET',
            url: Api.notifications,
            headers: {
                Authorization: 'Bearer ' + ls.get('4vam07')
            }
        }).catch((e) => {
            console.log('error fetching notifications', e.response)
        })

        if (response.data.status === 'success') {
            setNotifications(response.data.data)
        }

    }

    const getListing = async () => {

        let data = new FormData();
        data.append('country', context.currentLocation.name);
        data.append('currency', ls.get('curr').name);

        const response = await axios({
            method: 'POST',
            url: Api.fetchListings + '/rent/all/0',
            data: data
        }).catch((e) => {
            console.log('error fetching sidebar listing', e.response)
        })

        if (response.data.status === 'success') {
            setListing(response.data.data)
            setLoading(false);
        }

    }

    useEffect(() => {
        getNotifications();
        getListing();
    }, [context])

    return (
        <section className="p-2">

            <div className="d-flex gap-2 mb-2 justify-content-between">
                <Button type={tabPosition === 1 && "primary"} onClick={() => changeTabPosition(1)}
                        className="w-100">Notifications</Button>
                <Button type={tabPosition === 2 && "primary"} onClick={() => changeTabPosition(2)}
                        className="w-100">Listings</Button>
            </div>

            {
                loading ? (
                    <div className="w-100 text-center py-5">
                        <Logo size="small" color="white"/>
                        <p className="text-uppercase font-xs mt-2">Loading...</p>
                    </div>
                ) : (
                    tabPosition === 1 ? (
                        <div className=" h-100 ">
                            <h5 className="font-white mb-0 mt-3">Notifications</h5>
                            <p className="m-0 font-gray ">Email notifications sent to you</p>
                            <hr className="fancy mt-2 mb-3"/>
                            <List
                                size="small"
                                className=""
                                itemLayout="horizontal"
                                dataSource={notifications}
                                renderItem={item => (
                                    <a href={item.link} target="_blank">
                                        <List.Item className="font-white hover_primary_2 font-xxs hover cursor-pointer">
                                            <List.Item.Meta
                                                title={<span className="font-white">{item.subject}</span>}
                                                description={<span
                                                    className="font-gray font-xs">{item.message + '...'}</span>}
                                            />

                                            {moment(item.date.date).fromNow()}


                                        </List.Item>

                                    </a>
                                )}
                            />
                        </div>
                    ) : (
                        <div className=" h-100 ">
                            <h5 className="font-white mb-0 mt-3">{context.currentLocation.name}</h5>
                            <p className="m-0 font-gray ">Listings in your current location</p>
                            <hr className="fancy mt-2 mb-3"/>
                            <List
                                size="small"
                                className="font-xxs"
                                itemLayout="horizontal"
                                dataSource={listing}
                                renderItem={item => (
                                        <Display5 listing={item} currentCurrency={context.currentCurrency}/>
                                )}
                            />
                        </div>
                    )
                )
            }

        </section>
    )
}

const PendingPropertyView = (props) => {
    const context = useContext(activityContext);
    let selector = props.selector;
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState({});
    const [listing, setListing] = useState({});
    const [paymentLink, setPaymentLink] = useState(null);
    const [viewPayment, setViewPayment] = useState(false);
    const [viewAgreement, setViewAgreement] = useState(false);

    async function getProperty() {
        //setLoading(true);
        toast('Fetching property');

        const response = await axios({
            method: 'GET',
            url: Api.property + '/' + selector,
            headers: {
                Authorization: 'Bearer ' + ls.get('4vam07'),
            },
        }).catch((e) => {
            setLoading(false);
        })


        if (response.data.status === 'success') {
            setProperty(response.data.data);
            setListing(response.data.data.listing);
            setLoading(false);
        } else {
            console.log(response.data.message);

        }

    }

    function requestPaymentLink()
    {
        toast('Initializing Payment');

        axios({
            method: 'GET',
            url: Api.singlePropertyPaymentLink + '/' + selector,
            headers: {
                'Authorization': 'Bearer ' + ls.get('4vam07')
            }
        }).then((response) => {


            if (response.data.status === 'success') {

                setPaymentLink(response.data.data);
                setViewPayment(true);

            } else {
                toast.error(response.data.message);
            }

        }).catch(error => {
            console.log("response error " + error)
        })
    }


    const purchaseList = [
        {
            icon: 'fa fa-check-circle fa-2x',
            color: 'green',
            status: 'Completed',
            name: 'Rental/Purchase details',
            subtitle: 'Provide date of moving in, duration and other necessary information'
        },
        {
            icon: property.agreement_signed ? 'fa fa-2x fa-check-circle' : ' fa fa-2x fa-exclamation-circle fw-lighter',
            status: property.agreement_signed ? 'Completed' : 'Pending',
            name: 'Agreement',
            color: property.agreement_signed ? 'green' : null,
            subtitle: 'Sign property agreement',
            //link: () =>   property.agreement_signed ? null : property.agreement_link,
            onclick: () => property.agreement_signed === true ? null : setViewAgreement(true),
            showIcon: property.agreement_signed ? 'no' : 'yes'
        },
        {
            icon: property.status === 'active' ? 'fa fa-2x fa-check-circle' : ' fa fa-2x fa-exclamation-circle fw-lighter',
            status: property.status === 'active' ? 'Completed' : 'Complete signing of the property agreement',
            name: 'Payment',
            subtitle: 'Make payment for this property',
            color: property.status === 'active' ? 'green' : null,
            onclick: () => property.agreement_signed === true ? requestPaymentLink() : null,
            showIcon: property.status === 'active' ? 'no' : 'yes'
        }]

    useEffect(() => {
        getProperty();
    }, [props.selector])

    return(

        loading ? (
            <Loading />
            ):(
      <div>

          <Slider autoplay infinite={true}
              className="single_listing_carousel preview" >
              {
                  listing.photos.map((photo) => (
                      <div>
                          <img src={photo.image} width="100%" className="w-100"/>
                      </div>
                  ))
              }

          </Slider>

          <div className="py-4 border-bottom">
          <h5 className="mb-0">{listing.name}</h5>
          <p className="font-gray">{listing.physical_location}</p>
          <Link href={'/listing/' + listing.selector}>
              <a href="" className="btn btn-primary w-100">View Listing</a>
          </Link>
          </div>

          <div className="py-4 border-bottom">
          <label className="text-uppercase font-xs font-weight-600 text-primary">Details</label>

              <div className="border border_radius mt-2 p-3">
                  <div className="d-flex justify-content-between">
                      <p>Move in date</p>
                      <p>{new Date(property.move_in_date).toDateString()}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                      <p>Duration</p>
                      <p>{property.duration}</p>
                  </div>
                  <div className="d-flex border-bottom mb-2 justify-content-between">
                      <p>Total + fees</p>
                      <p>{context.currentCurrency.symbol + thousandSeparator(Number(property.status === 'pending' ? property.user_amount : property.user_renewal_amount).toFixed(2))}</p>
                  </div>
                  <div className="d-flex mb-2 align-items-center justify-content-between">
                      <BriefcaseOutline className="me-2"/>
                      <p className="ms-auto mb-0">
                          The figures above represent all charges you are required to pay for this property
                      </p>
                  </div>

              </div>
          </div>

          <div className="py-4">

              {
                  property.status === 'pending' || property.status === 'renewal_pending' ? (
                     <div>
                         <div className="d-flex justify-content-between align-items-center">
                             <label className="text-uppercase font-xs mb-2 font-weight-600 text-primary">Next steps</label>
                             <Button size="small" icon={<RefreshOutline />} onClick={() => getProperty()}>Refresh</Button>
                         </div>


                         {
                             purchaseList.map((list) => (
                                 <div style={{transform: 'rotate(0)' }} onClick={list.onclick} className="d-flex align-items-center cursor-pointer justify-content-between hover_primary_transparent p-3">
                                     <i className={list.icon} style={{color: list.color}}></i>
                                     <div className="font-xs ms-3 me-auto">
                                         {
                                             property.showIcon ? (
                                                 <Link href={list.link}>
                                                     <a className="stretched-link" target="_blank">
                                                         <h6>{list.name}</h6>
                                                         <p className="m-0 font-gray font-xs">{list.subtitle}</p>
                                                         <p className={list.status === 'Completed' ? " text-success m-0 font-xxs" : 'text-danger m-0 font-xxs'} >{list.status}</p>
                                                     </a>
                                                 </Link>
                                             ):(
                                                 <>
                                                     <h6>{list.name}</h6>
                                                     <p className="m-0 font-gray font-xs">{list.subtitle}</p>
                                                     <p className={list.status === 'Completed' ? " text-success m-0 font-xxs" : 'text-danger m-0 font-xxs'} >{list.status}</p>
                                                 </>

                                             )
                                         }

                                     </div>
                                     {
                                         list.showIcon === 'yes' ? (
                                             <ChevronForwardOutline />
                                         ):null
                                     }
                                 </div>
                             ))
                         }

                     </div>
                  ):(
                      <div className="p-5 text-center">
                          <i className="fa fa-check-circle fa-3x text-primary mb-3"></i>
                          <h5>Property Rented</h5>
                          <p className="mb-0 font-gray">Continue to manage your property</p>
                      </div>
                  )
              }
          </div>

          <Drawer
              title="Property Payment"
              className="mobile_drawer"
              width={500}
              onClose={() => {setViewPayment(false); getProperty()}}
              visible={viewPayment}
          >
              <iframe src={paymentLink} style={{height: '100%', width: '100%'}}></iframe>
          </Drawer>

          <Drawer
              width='70vw'
              className="mobile_drawer"
              title="View Agreement"
              onClose={() => {setViewAgreement(false); getProperty()}}
              visible={viewAgreement}
          >
              <iframe src={property.agreement_link} style={{height: '100%', width: '100%'}}></iframe>
          </Drawer>

      </div>

        )
    )
}


export {

    Nav,
    DashboardSidePanel,
    MessageView,
    PendingPropertyView,
    Random,
    Empty,
    Loading,
    Logo,
    thousandSeparator}