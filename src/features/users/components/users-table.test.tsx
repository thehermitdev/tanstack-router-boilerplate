import { render, screen } from '@testing-library/react'

import { UsersTable } from './users-table'

describe('UsersTable', () => {
  it('renders user data', () => {
    render(
      <UsersTable
        users={[
          {
            id: 1,
            firstName: 'Ada',
            lastName: 'Lovelace',
            email: 'ada@example.com',
            image: 'https://example.com/ada.png',
            role: 'admin',
          },
        ]}
      />,
    )

    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('ada@example.com')).toBeInTheDocument()
  })
})
