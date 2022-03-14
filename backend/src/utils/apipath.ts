import config from 'config'

const apiPrefix = config.get<string>('apiPrefix') // /api
const apiVersion = config.get<string>('apiVersion') // /v1
const apiAuthPrefix = `${apiPrefix}/${apiVersion}` // /api/v1/auth
const apiPathPrefix = `${apiPrefix}/${apiVersion}` // /api/v1/

export const API_END_POINTS = {
    REGISTER: `/${apiPathPrefix}/auth/register`,
    LOGIN: `/${apiPathPrefix}/auth/login`,
    HEALTH_CHECK: `/${apiPathPrefix}/healthcheck`
}