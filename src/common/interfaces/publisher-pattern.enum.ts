export enum PublisherPattern {
  /******************************** USERS *************************************/
  CONNECTION_CHECK = 'conection_check',
  CREATE_NEW_USER = 'create_new_user',
  CREATE_NEW_ADMIN_USER = 'create_new_admin_user',
  LOGIN = 'login',
  ACCOUNT_ACTIVATION = 'account_activation',
  FORGOT_PASSWORD = 'forgot_password',
  RESET_PASSWORD = 'reset_password',
  USER_PROFILE = 'user_profile',
  UPDATE_USER = 'update_user',

  /******************************** FLIGHT-BOOKING *************************************/
  CREATE_PLANE = 'create_plane',
  UPDATE_PLANE = 'update_plane',
  RETRIEVE_PLANE = 'retrieve_plane',
  RETRIEVE_ALL_PLANES = 'retrieve_all_planes',
  DELETE_PLANE = 'delete_plane',
  CREATE_BOOKING = 'create_booking',
  RETRIEVE_ALL_BOOKINGS = 'retrieve_all_bookings',
  RETRIEVE_BOOKING = 'retrieve_booking',
  BOOKING_ACTION = 'booking_action',

  /******************************** HOTEL-RESERVATION *************************************/
  CREATE_RESERVATION = 'create_reservation',
  RETRIEVE_RESERVATION = 'retrieve_reservation',
}
