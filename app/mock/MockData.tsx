
type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string;
    connections: number[];
    pokes: number[];
    requests: number[];
    images: string[3];
    socials: string[];
    privateProfile: boolean | true;
    visibility: boolean | true;
    moreInformation: {
        relationshipStatus: string;
        interests: string[];
        bio: string;
        school: string;
        work: string;
    }
    groups: string[];
    notifications: Notification[];
    blocked: number[];
    lastSeen?: string;
};

type Notification = {
    id: number;
    title: string;
    content: string;
    time: string;
    read: boolean;
};

const mockUsers: User[] = [
    {
        id: 1,
        name: "Tom Simpson",
        email: "tom_is_rich@example.com",
        username: "tommyboi509",
        avatar: "https://media.licdn.com/dms/image/C4E03AQH5b8z18kBWiA/profile-displayphoto-shrink_400_400/0/1526331777680?e=1705536000&v=beta&t=VpMTYwKTh2bJMQAGr-ErdP-SPVCoWusVdi_dlBHb7Go",
        connections: [ 2, 3, 10, 11 ],
        pokes: [ 5, 6, 7 ],
        requests: [ 4, 9 ],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Single",
            interests: ["Reading", "Traveling", "Cooking"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Harvard University",
            work: "Google Inc."
        },
        groups: ["Group 1", "Group 2"],
        notifications: [
            {
                id: 1,
                title: "New message",
                content: "You have a new message from Jane Smith",
                time: "2022-01-01T12:00:00Z",
                read: false
            },
            {
                id: 2,
                title: "New friend request",
                content: "You have a new friend request from Bob Johnson",
                time: "2022-01-02T12:00:00Z",
                read: false
            }
        ],
        blocked: [2]
    },
    {
        id: 2,
        name: "Austin Guyette",
        email: "jane.smith@example.com",
        username: "janesmith",
        avatar: "data:image/jpeg;base64,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",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Married",
            interests: ["Hiking", "Photography", "Yoga"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Stanford University",
            work: "Apple Inc."
        },
        groups: ["Group 1", "Group 3"],
        notifications: [
            {
                id: 3,
                title: "New message",
                content: "You have a new message from John Doe",
                time: "2022-01-03T12:00:00Z",
                read: false
            }
        ],
        blocked: [],
        lastSeen: "1 ago"
    },
    {
        id: 3,
        name: "Chip Overstreet",
        email: "bob.johnson@example.com",
        username: "henry_tea_club",
        avatar: "https://media.licdn.com/dms/image/C5603AQHSdXutqC3HdA/profile-displayphoto-shrink_400_400/0/1567734528897?e=1706140800&v=beta&t=pVEXLbwUot40xZmD96cWBaWOcb2k-2ccRa3GUKypp2c",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "In a relationship",
            interests: ["Swimming", "Cooking", "Gardening"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Massachusetts Institute of Technology",
            work: "Microsoft Corporation"
        },
        groups: ["Group 2", "Group 3"],
        notifications: [
            {
                id: 4,
                title: "New friend request",
                content: "You have a new friend request from Jane Smith",
                time: "2022-01-04T12:00:00Z",
                read: false
            }
        ],
        blocked: [],
        lastSeen: "2 ago"
    },
    {
        id: 4,
        name: "Lisa Shaffer",
        email: "alice.brown@example.com",
        username: "lisaShaffer",
        avatar: "https://www.whitworth.edu/cms/media/whitworth/images/academics/school-of-business/executive-speaker-series/lisa-schaffer-opt.jpg",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Single",
            interests: ["Dancing", "Singing", "Reading"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Yale University",
            work: "Amazon.com, Inc."
        },
        groups: ["Group 1", "Group 4"],
        notifications: [
            {
                id: 5,
                title: "New message",
                content: "You have a new message from Bob Johnson",
                time: "2022-01-05T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    },
    {
        id: 5,
        name: "Mark Gustafson",
        email: "david.lee@example.com",
        username: "mark_g",
        avatar: "https://media.licdn.com/dms/image/C4E03AQEpoH5ceSjAEA/profile-displayphoto-shrink_800_800/0/1517728542723?e=1706140800&v=beta&t=KKoElL2scta9wK-xIJU62-yNwpQBaK-j3xRJS36fQO0",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Married",
            interests: ["Fishing", "Hunting", "Camping"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "California Institute of Technology",
            work: "Facebook, Inc."
        },
        groups: ["Group 2", "Group 4"],
        notifications: [
            {
                id: 6,
                title: "New friend request",
                content: "You have a new friend request from Alice Brown",
                time: "2022-01-06T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    },
    {
        id: 6,
        name: "Richard Denenney",
        email: "emily.davis@example.com",
        username: "nancy_j",
        avatar: "https://media.licdn.com/dms/image/C5603AQE0c5JlVDJv3g/profile-displayphoto-shrink_400_400/0/1597860069513?e=1706140800&v=beta&t=3OwUXTU2cK8SKYwqSPv2GY28T8ZDP-6qLNYVSosTXXI",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "In a relationship",
            interests: ["Painting", "Drawing", "Sculpting"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Princeton University",
            work: "Netflix, Inc."
        },
        groups: ["Group 3", "Group 4"],
        notifications: [
            {
                id: 7,
                title: "New message",
                content: "You have a new message from Alice Brown",
                time: "2022-01-07T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    },
    {
        id: 7,
        name: "Rob Martinson",
        email: "george.wilson@example.com",
        username: "patatwal",
        avatar: "https://media.licdn.com/dms/image/C5603AQH6EeMNxsVn3g/profile-displayphoto-shrink_800_800/0/1516330502336?e=1706140800&v=beta&t=JoFfkbdhkplX80IZ7TYtj6GVqQBFGEazIqwUwwFqk30",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Single",
            interests: ["Playing guitar", "Singing", "Writing songs"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Columbia University",
            work: "Tesla, Inc."
        },
        groups: ["Group 1", "Group 5"],
        notifications: [
            {
                id: 8,
                title: "New friend request",
                content: "You have a new friend request from David Lee",
                time: "2022-01-08T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    },
    {
        id: 8,
        name: "Ramsey Pruchnic",
        email: "grace.taylor@example.com",
        username: "ramseypruchnic",
        avatar: "https://media.licdn.com/dms/image/D5635AQHmpq12RWF_Yw/profile-framedphoto-shrink_800_800/0/1697239516697?e=1700960400&v=beta&t=e1Jlg8jaQxsQpTpAYrCSyDRkJVhFgD6RxHLbD_CP6zw",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Married",
            interests: ["Cooking", "Baking", "Eating"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "Duke University",
            work: "Alphabet Inc."
        },
        groups: ["Group 2", "Group 5"],
        notifications: [
            {
                id: 9,
                title: "New message",
                content: "You have a new message from George Wilson",
                time: "2022-01-09T12:00:00Z",
                read: false
            }
        ],
        blocked: [],
        location: {
            latitude: 47.705481,
            longitude: -122.16874
        }
    },
    {
        id: 9,
        name: "Skye Henderson",
        email: "henry.clark@example.com",
        username: "henryclark",
        avatar: "https://media.licdn.com/dms/image/D5603AQG6rjcDonIslA/profile-displayphoto-shrink_400_400/0/1690498974370?e=1706140800&v=beta&t=YCD0GlXZgsXuTlmtTQ50o3xgDnbtdOXz4kizXJpytIU",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "In a relationship",
            interests: ["Playing basketball", "Watching movies", "Playing video games"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "University of Pennsylvania",
            work: "Uber Technologies, Inc."
        },
        groups: ["Group 3", "Group 5"],
        notifications: [
            {
                id: 10,
                title: "New friend request",
                content: "You have a new friend request from Grace Taylor",
                time: "2022-01-10T12:00:00Z",
                read: false
            }
        ],
        blocked: [],
        location: {
            latitude: 47.705481,
            longitude: -122.16874
        }
    },
    {
        id: 10,
        name: "Taylor Hoit",
        email: "https://d19j0qt0x55bap.cloudfront.net/production/startups/63066a135aaa39527df7dbfd/founders/images/profile_image/founder_taylor.jpg",
        username: "isabellabaker",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Single",
            interests: ["Playing piano", "Singing", "Writing songs"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "University of Chicago",
            work: "Intel Corporation"
        },
        groups: ["Group 1", "Group 6"],
        notifications: [
            {
                id: 11,
                title: "New message",
                content: "You have a new message from Henry Clark",
                time: "2022-01-11T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    },
    {
        id: 11,
        name: "Dan Roark",
        email: "jack.wright@example.com",
        username: "danRoark",
        avatar: "https://lirp.cdn-website.com/6f2d1a4f/dms3rep/multi/opt/Dan+Headshot-1920w.png",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Married",
            interests: ["Playing guitar", "Singing", "Writing songs"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "University of Michigan",
            work: "Oracle Corporation"
        },
        groups: ["Group 2", "Group 6"],
        notifications: [
            {
                id: 12,
                title: "New friend request",
                content: "You have a new friend request from Isabella Baker",
                time: "2022-01-12T12:00:00Z",
                read: false
            }
        ],
        blocked: [],
        location: {
            latitude: 47.705481,
            longitude: -122.16874
        }
    },
   
];


export default mockUsers;
