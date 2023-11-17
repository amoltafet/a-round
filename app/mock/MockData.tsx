
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
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
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
        name: "Jane Smith",
        email: "jane.smith@example.com",
        username: "janesmith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
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
        blocked: []
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        username: "bobjohnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
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
        blocked: []
    },
    {
        id: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        username: "alicebrown",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
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
        name: "David Lee",
        email: "david.lee@example.com",
        username: "davidlee",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
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
        name: "Emily Davis",
        email: "emily.davis@example.com",
        username: "emilydavis",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
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
        name: "George Wilson",
        email: "george.wilson@example.com",
        username: "georgewilson",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
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
        name: "Grace Taylor",
        email: "grace.taylor@example.com",
        username: "gracetaylor",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
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
        blocked: []
    },
    {
        id: 9,
        name: "Henry Clark",
        email: "henry.clark@example.com",
        username: "henryclark",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
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
        blocked: []
    },
    {
        id: 10,
        name: "Isabella Baker",
        email: "isabella.baker@example.com",
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
        name: "Jack Wright",
        email: "jack.wright@example.com",
        username: "jackwright",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
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
        blocked: []
    },
    {
        id: 12,
        name: "Katherine Lewis",
        email: "katherine.lewis@example.com",
        username: "katherinelewis",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "In a relationship",
            interests: ["Playing piano", "Singing", "Writing songs"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "University of California, Los Angeles",
            work: "Cisco Systems, Inc."
        },
        groups: ["Group 3", "Group 6"],
        notifications: [
            {
                id: 13,
                title: "New message",
                content: "You have a new message from Jack Wright",
                time: "2022-01-13T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    },
    {
        id: 13,
        name: "Liam Green",
        email: "liam.green@example.com",
        username: "liamgreen",
        avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        connections: [],
        pokes: [],
        requests: [],
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        socials: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/"],
        privateProfile: true,
        visibility: true,
        moreInformation: {
            relationshipStatus: "Single",
            interests: ["Playing basketball", "Watching movies", "Playing video games"],
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel bibendum bibendum, elit elit bibendum elit, vel bibendum elit elit elit.",
            school: "University of Virginia",
            work: "Adobe Inc."
        },
        groups: ["Group 1", "Group 7"],
        notifications: [
            {
                id: 14,
                title: "New friend request",
                content: "You have a new friend request from Katherine Lewis",
                time: "2022-01-14T12:00:00Z",
                read: false
            }
        ],
        blocked: []
    }
];


export default mockUsers;
