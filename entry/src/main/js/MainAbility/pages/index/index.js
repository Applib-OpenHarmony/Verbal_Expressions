import VerEx from "@ohos/verbal_expressions"
import prompt from '@system.prompt'
import fetch from '@system.fetch';
let regex;

export default {
    data: {
        title: "",
        jsx: "",
        p: "aAa_2AA",
        next: false,
        data: [],
        disappear: "",
        validated: false,
        manipulated: false,
        sanitized: false,
        inserted: false,
        movies: [{
                     "id": 1,
                     "title": "HaroldAndKumarGoToWhiteCastle",
                     "language": "eng"
                 },
                 {
                     "id": 2,
                     "title": "FightClub",
                     "language": "eng"
                 }],
        username: 'Palash',
    },
    changeChecked(res) {
        this.next = res.checked
    },
    onInit() {
        console.log("Initialized...")
    },
    validatePassword() {
        console.log('inside validate password');
        /*
            Password Validation

            Rules for password:
            1. It must have between 6 and 10 alphanumeric or underscore characters.
            2. It must include at least two lowercase letter.
            3. It must include at least three uppercase letters.
            4. It must include at least one digit.
         */

        regex = VerEx()
            .positiveLookAhead(VerEx().multiple(VerEx().anyOf('a-zA-Z0-9_'), 6, 10))
            .positiveLookAhead(VerEx().multiple(VerEx().anythingBut('a-z').oneOrMore().anyOf('a-z'), 2))
            .positiveLookAhead(VerEx().multiple(VerEx().anythingBut('A-Z').oneOrMore().anyOf('A-Z'), 3))
            .positiveLookAhead(VerEx().multiple(VerEx().anythingBut('0-9').oneOrMore().anyOf('0-9'), 1))

        console.log(regex.toRegExp())
        if(this.next) {
            prompt.showToast({
                message: 'Moving on...',
                duration: 3000,
            })
            this.disappear = "fadeOut"
            // this.fetchMockData()
            setTimeout(() => {
                this.validated = true
                this.manipulated = true
                this.disappear = "fadeIn"
            }, 2000)
        }
        else {
            prompt.showToast({
                message: regex.toRegExp().test(this.p) ? 'Correct' : 'Incorrect',
                duration: 5000,
            })
        }
    },
    substringManipulation() {
        console.log('inside substring manipulation');
        if(this.next) {
            prompt.showToast({
                message: 'Moving on...',
                duration: 3000,
            })
            this.movies = []
            this.disappear = "fadeOut"
            setTimeout(() => {
                this.validated = true
                this.manipulated = false
                this.sanitized = true
                this.disappear = "fadeIn"
            }, 2000)
        }
        regex = VerEx()
            .positiveLookBehind(VerEx().anyOf('a-z'))
            .positiveLookAhead(VerEx().anyOf('A-Z'))

        for(let movie of this.movies) {
            this.movies.push(movie.title.replace(regex.toRegExp(), ' '))
        }
        console.log(regex.toRegExp())
        console.log(JSON.stringify(this.movies));
    },
    fieldSanitization() {
        /*
            Checking Form Inputs for SQL Injection Attacks
         */
        regex = VerEx().any(';').oneOrMore()
        if(regex.toRegExp().test(this.username)) {
            prompt.showToast({
                message: 'Illegal Symbols Found!',
                duration: 3000,
            })
        }
        else {
            if(this.next) {
                prompt.showToast({
                    message: 'Moving on...',
                    duration: 3000,
                })
                setTimeout(() => {
                    prompt.showToast({
                        message: 'Before Insertion: ' + `<html><body style="height: 200px">...</body></html>`,
                        duration: 3000,
                    })
                }, 2000)
                this.disappear = "fadeOut"
                setTimeout(() => {
                    this.validated = true
                    this.manipulated = false
                    this.sanitized = false
                    this.inserted = true
                    this.disappear = "fadeIn"
                }, 2000)
            }
            else {
                prompt.showToast({
                    message: 'Clean Field!',
                    duration: 3000,
                })
                this.extractionMatching()
            }
        }
    },
    extractionMatching() {
          let url = `https://www.google.com?user=${this.username}&uuid=3d77df42s8`

        regex = VerEx()
            .anythingBut('?&')
            .positiveLookAhead('=')
            .anythingBut('&')

        console.log(url.match(regex.toRegExp()).reduce((prev, cur) => {
            let split = cur.split('=')
            prev += split[0] + ': ' + split[1] + '\n'
            return prev
        }, ''))

        console.log(regex.toRegExp())
    },
    dynamicInsertion() {
        let jsx = `<html><body style="height: 200px">...</body></html>
        `;

        console.log(jsx)

        regex = VerEx()
            .positiveLookAhead(VerEx().add('</body>'))

        setTimeout(() => {
            console.log(jsx.replace(regex.toRegExp(), `<h1>Data Pulled from API: ${this.username}</h1>`))
            console.log(regex.toRegExp())
        }, 5000)
        prompt.showToast({
            message: 'Dynamic Insertion: '+jsx.replace(regex.toRegExp(), `<h1>Data Pulled from API: ${this.username}</h1>`),
            duration: 3000,
        })
    }
}