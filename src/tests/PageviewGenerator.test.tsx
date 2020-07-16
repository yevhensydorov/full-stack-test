import React from 'react'
import { screen, fireEvent, render } from '@testing-library/react'

import { PageviewGenerator } from '../PageviewGenerator'

describe('<PageviewGenerator />', () => {
  test('should display Generate pageview button', () => {
    const { getByText } = render(<PageviewGenerator />)
    const generatePageViewButton = getByText('Generate pageview')

    expect(generatePageViewButton).toBeTruthy()
  })
})

describe('<PageviewGenerator />', () => {
  test('should NOT display all event paragraphs without clicking the button', () => {
    const eventIdParagraphElement = screen.queryByText('Event ID:')
    expect(eventIdParagraphElement).not.toBeInTheDocument()
  })
})

describe('<PageviewGenerator />', () => {
  test('should display all event paragraphs after clicking the button', async () => {
    const { getByText, findByText } = render(<PageviewGenerator />)
    fireEvent.click(getByText('Generate pageview'))

    const eventIdParagraphElement = await findByText(/Event ID:/)
    const eventDateParagraphElement = await findByText(/Event date:/)
    const pageTitleParagraphElement = await findByText(/Page title:/)
    const pageDescriptionParagraphElement = await findByText(
      /Page description:/
    )
    const pageTagsParagraphElement = await findByText(/Page tags:/)
    const userIdParagraphElement = await findByText(/User ID:/)
    const userJoinedParagraphElement = await findByText(/User joined:/)

    expect(eventIdParagraphElement).toBeTruthy()
    expect(eventDateParagraphElement).toBeTruthy()
    expect(pageTitleParagraphElement).toBeTruthy()
    expect(pageDescriptionParagraphElement).toBeTruthy()
    expect(pageTagsParagraphElement).toBeTruthy()
    expect(userIdParagraphElement).toBeTruthy()
    expect(userJoinedParagraphElement).toBeTruthy()
  })
})
