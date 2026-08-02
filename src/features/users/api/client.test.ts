import { getUsers } from './client'

describe('getUsers', () => {
  it('returns validated users from the API boundary', async () => {
    const result = await getUsers({ page: 1, pageSize: 10 })

    expect(result.total).toBe(1)
    expect(result.users[0]?.email).toBe('ada@example.com')
  })
})
