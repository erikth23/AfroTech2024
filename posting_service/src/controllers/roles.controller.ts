import { catchAsync } from "../utils/catchAsync";
import { getDynamoDBClient } from "../clients/ddb";
import httpStatus from 'http-status'
import { ResponseDAO, RoleDAO } from "../dao";

const roleDao = new RoleDAO(getDynamoDBClient(), "design-roles")
const responseDao = new ResponseDAO(getDynamoDBClient(), "canidate-responses")

const getStringifiedRoleId = (req: any) => {
    const { organizationId, hash } = req.body.roleId

    return `${organizationId}::${hash}`
}

const getRoles = catchAsync(async (req: any, res: any) => {
    const { organizationId } = req.body

    const roles = await roleDao.getRolesByOrganizationId(organizationId)

    console.log(roles)

    res.status(httpStatus.OK).send(roles)
})

const putRole = catchAsync(async (req: any, res: any) => {
    const { organizationId, title, canidates, testId } = req.body

    const success = await roleDao.createRole({
        "organization-id": organizationId,
        "role-id": "stub",
        title,
        canidates,
        testId
    })

    res.status(httpStatus.NO_CONTENT).send()
})

const getRole = catchAsync(async (req: any, res: any) => {
    const { roleId } = req.body

    const role = await roleDao.getRole(roleId.organizationId, roleId.hash)

    res.status(httpStatus.OK).send(role)
})

const addCanidates = catchAsync(async (req: any, res: any) => {
    const { roleId, canidates } = req.body
    
    const role = await roleDao.getRole(roleId.organizationId, roleId.hash)

    if (role == null) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "No role with that id exists" })
        return;
    }

    if (role.canidates == null) {
        role.canidates = []
    }

    role.canidates.push(...canidates)
    const updatedRole = await roleDao.updateRole(roleId.organizationId, roleId.hash, role)

    res.status(httpStatus.OK).send(updatedRole)
})

const getCanidatesForRecruiter = catchAsync(async (req: any, res: any) => {
    const { organizationId, hash } = req.body.roleId
    const roleId = getStringifiedRoleId(req)

    const role = await roleDao.getRole(organizationId, hash)

    if (!role || !role.canidates) {
        res.status(httpStatus.NOT_FOUND).send("This role doesn't have any canidates")
    }

    const responses = await responseDao.getResponsesByRoleId(roleId)

    if (!role) {
        throw new Error("No role found")
    }

    let statusToCanidate = new Map()

    statusToCanidate.set("Active", [])
    statusToCanidate.set("Closed", [])
    statusToCanidate.set("Not-Started", [])

    const canidateToResponse = responses?.reduce((result, currValue) => {
        result.set(currValue.canidateId, currValue)
        return result
    }, new Map())

    role.canidates?.forEach(canidateId => {
        const response = canidateToResponse ? canidateToResponse.get(canidateId) : null
        if (response) {
            statusToCanidate.get(response.status).push({
                canidateId: canidateId,
                evaluation: response.evaluation
            })
        } else {
            statusToCanidate.get("Not-Started").push(canidateId)
        }
        canidateToResponse?.delete(canidateId)
    })

    canidateToResponse?.forEach((response, canidateId) => {
        statusToCanidate.get("Closed").push({
            canidateId: canidateId,
            evaluation: response.evaluation,
            canidateData: response.canidateData
        })
    })

    res.status(httpStatus.OK).send(Object.fromEntries(statusToCanidate))
})

const getCanidateEvaluation = catchAsync(async (req: any, res: any) => {
    const { canidateId } = req.body
    const roleId = getStringifiedRoleId(req)

    const response = await responseDao.getResponse(roleId, canidateId)

    res.status(httpStatus.OK).send(response)
})

export default {
    getRoles,
    getRole,
    putRole,
    addCanidates,
    getCanidatesForRecruiter,
    getCanidateEvaluation
}