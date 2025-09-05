import express from "express"
import db from "../db/db.js"

const router = express.Router()

// (async () => {
//   try {
//     const result = await db.query('SELECT NOW()');
//     console.log('DB is working:', result.rows[0]);
//   } catch (err) {
//     console.error('DB error:', err);
//   }
// })();

let testImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZ91ERVxHa0w_82mDyyl0YMEHlsJASTa1zw&s"

router.get("/", (req,res) => {
      const quickAccessInstances = [
    { img: "/assets/gate.png", link: '/home', text: 'Inbox' },
    { img: "/assets/clip.png", link: '/settings', text: 'Habit Tracker' },
    { img: "/assets/project.png", link: '/profile', text: 'Projects' },
    { img: "/assets/calendar.png", link: '/messages', text: 'Calendar Helper' },
    { img: "/assets/actions.png", link: '/logout', text: 'Actions Helper' }
  ];
        const secondaryAccessInstances = [
    { img: "/assets/idea.png", link: '/home', text: 'Idea Tracker' },
    { img: "/assets/eventAwareness.png", link: '/settings', text: 'Event awareness tool' },
    { img: "/assets/issue.png", link: '/profile', text: 'Issue tracker' },
    { img: "/assets/firstAid.png", link: '/messages', text: 'My aid helper' },
    { img: "/assets/solutions.png", link: '/logout', text: 'Solution Tracker' },
    { img: "/assets/performance.png", link: '/messages', text: 'Performance tracker' },
    { img: "/assets/buylist.png", link: '/logout', text: 'Want to buy tracker' }
  ];

  const quickActionTasks = [
1,2,3,4,5,6,7,8,9,10,11,"Completing the Use PostGres Odin Lesson (50%) skibidi obama",13,14,15,16,17,18,19,20,21
  ]

  const projectInstances = [{projectName: "skibidi",nextTask:"obama Barrack",taskDate:"6/9/1969"},
    {projectName: "skibidi",nextTask:"the fitnessgram pacer test is a multistage aerobic capacity test consisting of various stages which stress maximum aerobic capacity, ready?",taskDate:"6/9/1969"}
  ]
    res.render("main", {quickAccessInstances,secondaryAccessInstances,quickActionTasks,projectInstances})
})

export default router