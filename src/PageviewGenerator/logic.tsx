import cuid from 'cuid'
import { loremIpsum } from 'lorem-ipsum'
import { useState } from 'react'
import { randomDate } from '../utilities/randomDate'

import { API_SERVER_URL } from '../constants/urls'

interface Pageview {
  id: string
  created_at: Date

  page: {
    title: string
    description: string
    tags: string[]
  }

  user: {
    id: string
    created_at: Date
  }
}

export const usePageviewGenerator = () => {
  const [pageview, setPageview] = useState<Pageview | null>(null)

  const generate = () => {
    const event: Pageview = {
      id: cuid(),
      created_at: new Date(),

      page: {
        title: loremIpsum(),
        description: loremIpsum({ count: 3 }),
        tags: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
          loremIpsum({ units: 'words', count: 1 })
        )
      },

      user: {
        id: `USER${cuid()}`,
        created_at: randomDate(new Date(2019, 0, 1), new Date())
      }
    }
    fetch(`${API_SERVER_URL}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: event.id,
        createdAt: event.created_at,
        title: event.page.title,
        description: event.page.description,
        tags: event.page.tags.join(', '),
        userId: event.user.id,
        userCreatedAt: event.user.created_at
      })
    })
      .then((res) => res.json())
      // Enhance: Loading handling
      .then(() => {
        console.log('Message Added')
      })
    // Enhance: Error handling
    setPageview(event)
  }

  return {
    generate,
    pageview
  }
}
