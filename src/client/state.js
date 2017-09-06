// State draft
export default {
  entities: {
    users: {
      byID: {
        '1': {
          id: '1',
          name: 'Jacob Blomgren',
          username: 'jacob',
          profilePictureURL: '/static/avatar.png',
          description: 'Im a developer from Stockholm',
          createdAt: '2017-08-27',
          following: 10,
          followers: 30,
          follows: true,
          tweets: ['64', '63'],
        },
      },
      allIDs: ['1'],
    },
    tweets: {
      byID: {
        '64': {
          id: '64',
          userID: '1',
          content: '#A #whole #lotta #hashtags',
          createdAt: '2017-08-27T14:01:02.162Z',
          replies: 0,
          retweets: 2,
          likes: 10,
        },
        '63': {
          id: 63,
          userID: '1',
          content: 'Just a tweet with some emojis 🏈 🤾',
          created_at: '2017-08-16T18:49:02.162Z',
          replies: 100000,
          retweets: 200000,
          likes: 950000,
        },
      },
      allIDs: ['64'],
    },
  },
};
