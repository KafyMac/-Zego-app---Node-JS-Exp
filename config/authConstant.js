const JWT = {
    ADMIN_SECRET: "EtU0USaA9KlVjnbWVQSjsR6r0eQdn7DMbGA3rVj8ijTHE9Dm8dS7i2dmP9KjQER",
    DEVICE_SECRET: "myjwtdevicesecret",
    ISSUER: "smarthumanoid.com",
    AUDIENCE: "smarthumanoid.com",
    ALGORITHM: "HS256",
    EXPIRES_IN_SECONDS: 60 * 24 * 12 * 60,
};

const USER_ROLE = {
    SUPER_CPRO: 9,
    CPRO: 10,
    SUB_CPRO: 11,
    STAFF: 4,
};

const PLATFORM = {
    CPRO_MANAGER: 19,
    SUPER_CPRO: 9,
    CPRO: 10,
    SUB_CPRO: 11,
    STAFF: 4,
};

let LOGIN_ACCESS = { [USER_ROLE.SUPER_CPRO]: [PLATFORM.SUPER_CPRO] };

const DEFAULT_ROLE = 1;

const ROLE_RIGHTS = {
    [USER_ROLE.SUPER_CPRO]: [
        "getAllByAdminInDevicePlatform",
        "getByAdminInDevicePlatform",
        "aggregateByAdminInDevicePlatform",
        "getCountByAdminInDevicePlatform",
        "createByAdminInDevicePlatform",
        "addBulkByAdminInDevicePlatform",
        "updateByAdminInDevicePlatform",
        "updateBulkByAdminInDevicePlatform",
        "partialUpdateByAdminInDevicePlatform",
        "deleteByAdminInDevicePlatform",
        "softDeleteByAdminInDevicePlatform",
        "upsertByAdminInDevicePlatform",
        "fileUploadByAdminInDevicePlatform",
        "changePasswordByAdminInDevicePlatform",
        "getAllByAdminInAdminPlatform",
        "getByAdminInAdminPlatform",
        "aggregateByAdminInAdminPlatform",
        "getCountByAdminInAdminPlatform",
        "createByAdminInAdminPlatform",
        "addBulkByAdminInAdminPlatform",
        "updateByAdminInAdminPlatform",
        "updateBulkByAdminInAdminPlatform",
        "partialUpdateByAdminInAdminPlatform",
        "deleteByAdminInAdminPlatform",
        "softDeleteByAdminInAdminPlatform",
        "upsertByAdminInAdminPlatform",
        "fileUploadByAdminInAdminPlatform",
        "changePasswordByAdminInAdminPlatform",
    ],
};
const MAX_LOGIN_RETRY_LIMIT = 5;

const FORGOT_PASSWORD_WITH = {
    OTP: {
        email: true,
        sms: false,
    },
    EXPIRETIME: 20,
};

module.exports = {
    JWT,
    USER_ROLE,
    DEFAULT_ROLE,
    ROLE_RIGHTS,
    PLATFORM,
    MAX_LOGIN_RETRY_LIMIT,
    FORGOT_PASSWORD_WITH,
    LOGIN_ACCESS,
};
