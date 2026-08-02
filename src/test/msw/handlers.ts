import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('*/users', () =>
    HttpResponse.json({
      users: [
        {
          id: 1,
          firstName: 'Ada',
          lastName: 'Lovelace',
          email: 'ada@example.com',
          image: 'https://example.com/ada.png',
          role: 'admin',
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    }),
  ),
]
