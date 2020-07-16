import React from 'react'
import { render } from '@testing-library/react'

import { PageviewGenerator } from '../PageviewGenerator'

describe('<PageviewGenerator />', () => {
  test('should display Generate pageview button', async () => {
    const { getByText } = render(<PageviewGenerator />)
    const generatePageViewButton = getByText('Generate pageview')

    expect(generatePageViewButton).toBeTruthy()
  })
})
