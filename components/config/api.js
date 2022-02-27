const api = process.env.API; // stagging
const mobile_api = process.env.MOBILE_API;

// AUTH
export const login = api + "/auth/login";
export const register = api + "/auth/signup";
export const featuredListing = api + "/featured/listing";
export const getUser = mobile_api + "/user";
export const setLocation = mobile_api + "/user/set_location";
export const setCurrency = mobile_api + "/user/set_currency";
export const forgotPassword = mobile_api + "/auth/forgot_password_request";

// location
export const getLocations = api + "/locations";
export const getLocationsCurrencies = api + "/location_currency";
export const getStates = mobile_api + "/locations/states";
export const getCountryStates = api + "/locations"; // the full endpoint is locations/{country}/states
export const updateLocation = api + "/user/location/update";
export const updateCurrency = api + "/user/currency/update";

//listing
export const getSingleState = api + "/location/state"; // the full endpoint is location/state/{name}/listing
export const getCountryListing = api + "/location"; // the full endpoint is location/{name}/listing
export const shortlist = api + "/shortlist";
export const searchListing = api + "/search/listing";
export const addShortlist = mobile_api + "/shortlist/add";
export const removeFavorite = mobile_api + "/shortlist/remove";
export const fetchListings = api + "/listing/fetch";
export const getListing = api + "/listing";
export const mobileListing = mobile_api + "/listing";
export const editListing = mobile_api + "/listing/edit";
export const newListing = mobile_api + "/listing/new";
export const getSingleListing = api + "/single/listing";
export const listingDetails = mobile_api + '/listing_details';
export const deleteFee = mobile_api + '/listing/delete_fee';
export const stateListing = api + "/listing/state"; // the full endpoint is location/state/{name}/listing
export const deleteListingImage = mobile_api + "/listing/delete_image";
export const updateListingStatus = mobile_api + '/listing/settings/update_status';

// Landlord
export const landlordProperties = mobile_api + '/landlord/properties';
export const landlordRequests = mobile_api + '/landlord/requests';
export const landlordDeclineRequest = mobile_api + "/landlord/request/decline";
export const landlordAcceptRequest = mobile_api + "/landlord/request/accept";


// USER
export const notifications = api + "/user/emails";
export const updateDetails = mobile_api + "/user/details/update";
export const updatePassword = mobile_api + "/user/update_password";
export const kyc = mobile_api + "/user/kyc_validation";
export const favorites = mobile_api + "/shortlist";


// MESSAGES
export const property = mobile_api + "/property";
export const markAsRead = mobile_api + "/chat/read";
export const notAllowedKeywords = mobile_api + "/not_allowed_keywords";
export const sendChat = mobile_api + "/chat/send";

// PROPERTIES
export const myProperties = mobile_api + "/my_properties";

// PAYMENT
export const singlePropertyPaymentLink = mobile_api + "/property/payment";
export const payout = mobile_api + "/payout";
export const updatePaymentDetails = mobile_api + '/user/payment_details';