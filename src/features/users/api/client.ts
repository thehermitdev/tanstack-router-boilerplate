import { z } from 'zod'

import { httpClient } from '#/shared/api/http-client'
import { ApplicationError } from '#/shared/errors/application-error'
import { usersListResponseSchema, type UsersListResponse } from './contracts'

export interface GetUsersInput {
  page: number
  pageSize: number
  signal?: AbortSignal
}

export async function getUsers({
  page,
  pageSize,
  signal,
}: GetUsersInput): Promise<UsersListResponse> {
  const response = await httpClient.get('/users', {
    params: {
      limit: pageSize,
      skip: (page - 1) * pageSize,
    },
    signal,
  })

  try {
    return usersListResponseSchema.parse(response.data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApplicationError('The users API returned an invalid response', {
        code: 'API_CONTRACT_ERROR',
        details: error.flatten(),
        cause: error,
      })
    }

    throw error
  }
}
