export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
// export const PERMISSIONS = [
//     'read',
//     'create_asset',
//     'view_asset',
//     'view_tree',
//     'upload',
//     'delete_document',
//     'review_document',
//     'archive_document',
//     'view_document'
// ];
export const PERMISSION = {
    CREATE_ASSET: 'create_asset',
    VIEW_ASSET: 'view_assets',
    VIEW_TREE: 'view_tree',
    UPLOAD: 'upload_document',
    DELETE_DOCUMENT: 'delete_document',
    REVIEW_DOCUMENT: 'review_document',
    ARCHIVE_DOCUMENT: 'archive_document',
    VIEW_DOCUMENT: 'view_document',
    CREATE_MEMBER: 'create_member',
    VIEW_MEMBERS: 'view_members',
    DELETE_MEMBER: 'delete_member',
    ASSIGN_MEMBER: 'assign_member',
    UN_ASSIGN_MEMBER: 'unassign_member',
    UPDATE_MEMBER: 'update_member',
    COPY_MEMBER: 'copy_member',
    VIEW_SUB_ASSET: 'view_sub_assets',
    VIEW_TASK: 'view_tasks',
    DELETE_TASK: 'delete_task',
    CREATE_TASK: 'create_task',
    DELETE_ASSET: 'delete_asset',
};
export const ROLE = {
    ACCOUNT_OWNER: 'account_owner'
};

export const MESSAGE = {
    REETRICTED_ACTION_ERROR: 'Sorry your action has been forbidden ✋ ',
    PERMISSION_ERROR: 'You haven\'t proper permission 💥 ',
    SOMETHING_GONE_WRONG: 'Something gone wrong 💥 ',
    UNPROCESSED_ENTITY: 'We are not able to process your request 🙇‍♀️ ',
    NOT_FOUND: 'We are not able to find your requested record 🙇‍♀️ ',
    ASSEST_CREATED: 'Your Asset has been created successfully 🎉',
    ASSEST_NOT_CREATED: 'Your Asset is not created 😢 ',
    ACTION_FAILED: 'Your action has been failed 😢 ',
    LOGOUT_SUCCESS: 'You have been logged out successfully 👋',
    ROLE_CREATED: 'Role has been updated successfully 👍 ',
    ROLE_NOT_CREATED: 'Nothing is created 🤔 ',
    ASSET_REMOVED: 'Asset has been removed successfully 👍 ',
    ASSET_ASSIGNED: 'Asset has been assigned 👍 ',
    USER_REMOVED: 'User has been removed successfully 👍 ',
    USER_CREATED: 'User has been created successfully 👍 ',
    EMAIL_DUPLICATE: 'User with this email already register 🤔 ',
    SUCCESS_MESSAGE: 'Your account has been created successfully! Instruction has been emails to you. 👍 ',
    ERROR_MESSAGE: 'Please fix the errors and try again. Thanks. 🤔 ',
    SUCCESS_RESET_MESSAGE: 'You would be receiving the instruction in your email shortly 👍 ',
    SUCCESS_PASS_RESET_MESSAGE: 'Your password has been reset, you may login now.👍 ',
    INCORRECT_LOGIN: 'Your email or password is incorrect. 🤔 ',
    INCORRECT_EMAIL: 'Entered email is incorrect. 🤔 ',
    TOKEN_IS_INCORRECT: 'Token is incorrect. 🤔 ',
    COLLABORATOR_NOTIFIED: 'New Collaborator has been notified. 👍 ',
    COLLABORATORS_NOTIFIED: 'New Collaborators have been notified. 👍 ',
    NEW_ROLE_HAS_BEEN_ADDED: 'New Role has been added. 👍 ',
    ROLE_HAS_BEEN_UPDATED: 'Role has been updated. 👍 ',
    SUCCESS_RECORD_UPDATED: 'Record has been updated 👍 ',
    SUCCESS_RECORD_DELETED: 'Record successfully deleted 👍 ',
    SUCCESS_RECORD_CREATED: 'Record has been created successfully 👍 ',
    PARENT_HAS_NO_MEMBER: 'Parent Asset Has No Member To Transfer',

};

export const COMPS = ['Comments', 'Documents', 'Members', 'Info', 'Checklist'];
