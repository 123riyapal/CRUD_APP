const errorMessages = {
    MISSING_FIELDS: 'Please add all fields',
    USER_ALREADY_EXISTS: 'User already exists',
    INVALID_USER: 'Invalid user',
    INVALID_CREDENTIALS: 'Email or password is invalid',
    ROLE_NOT_FOUND: (role) => `Role '${role}' not found`,
  
    USER_NOT_FOUND: 'User not found',
    UPDATE_USER_ERROR: 'Error updating user',
  
    NO_FILE_UPLOADED: 'Please upload an Excel file',
    EMPTY_FILE: 'Empty file or invalid format',
    MISSING_FILE_FIELDS: 'Missing required fields in file',
    USER_ID_NOT_FOUND: (userId) => `User with ID ${userId} not found`,
    MARKSHEET_PROCESSING_ERROR: 'Error processing marksheet',
  
    MARKS_NOT_FOUND: 'Marks not found for this user',
    PDF_GENERATION_ERROR: 'Error generating PDF',
  
    SERVER_ERROR: (message) => `Internal server error: ${message}`,
  };
  
  module.exports = errorMessages;