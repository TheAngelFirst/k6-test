import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep, group, check } from 'k6'
import http from 'k6/http'
import * as config from './config.js'

const jsonMembersPool = JSON.parse(open('members-datapool.json'));

export const options = {
    scenarios: {
        first_scenario: {
            executor: "shared-iterations",
            vus: 1,
            iterations: 1,
            startTime: "0s",
            tags: { test_type: 'test1' }, // different extra metric tags for this scenario
            exec: 'apitest', // same function as the scenario above, but with different env vars
        },
        second_scenario: {
            executor: 'ramping-vus',
            startTime: '0s',
            startvus: 0,
            stages: [
                { target: 0, duration: '10s' }, // stable stage 0 vu 10s
                { target: 2, duration: '0s' }, // startup 2 vu in 0s
                { target: 2, duration: '10s' }, // stable load stage 2 vu 10s
            ],
            gracefulRampDown: "1s",
            tags: { test_type: 'test2' }, // different extra metric tags for this scenario
            exec: 'apitest', // same function as the scenario above, but with different env vars
        },
    },
};

export function apitest() {
    let response

    let r_token = null;
    group(config.HOST, function () {
        response = http.get(config.HOST, {
            headers: {
                'content-type': 'text/html',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
            },
        })

        r_token = findBetween(response.body, '<h1 id=\"token\">token=', '</h1>');

        check(r_token, {
            'token exists': (t) => t != null,
        });
        check(response, {
            'is status 200': (r) => r.status === 200,
        });

        sleep(0.9)

        let body_data = JSON.stringify(getRandMemberOrMembersFromJsonPool(jsonMembersPool));
        //console.log('body_data: ', body_data);
        response = http.post(config.HOST, body_data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Authorization': r_token,
                },
            }
        )

        //console.log('body: \n' + response.body + '\n');
        let r_id = null;
        if (~response.body.indexOf("members")) {  // members найден в массиве
            r_id = response.json("members.#.id");
        } else { // не найден
            r_id = response.json("id");
        }
        console.info('id: ' + r_id + '\n');

        check(r_id, {
            'id exists': (i) => typeof i !== 'undefined',
        });
        check(response, {
            'is status 200': (r) => r.status === 200,
        });

        sleep(0.9)
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandMemberOrMembersFromJsonPool(jsonMembersData) {
    let members_data = jsonMembersData.members;
    let rand = getRandomInt(members_data.length + 1)
    if (rand == members_data.length) {
        return jsonMembersPool;
    } else {
        return members_data[rand];
    }
}
/* 
+ 1. Сделать несколько запросов: 1 GET и 1 POST (желательно json). Учитывать, что host у endpoint может меняться под стенд тестирования для всех запросов сразу. 
+ 2. Исходить из того, что например запрос GET (это условно авторизация) и полученный в GET ответ (в данном случае можно объявить самому переменную токен=тест) мы должны дальше передавать как токен в POST в хедерах, например 'Authorization': токен (и таких запросов POST может быть много в скрипте). 
+ 3. Сделать передачу headers (get и post) с учетом того, что могут меняться отдельные параметры хедеров у разных запросов, например Content-Type разный у get (text/html) и post (application/json). 
+ 4. Сделать передачу body (post) исходя из того, что содержимое body динамическое. 
+ 5. Сделать два сценария запуска этих двух запросов. Например: 1 виртуальный пользователь 1 итерация. И: 10 сек stage ни одного пользователя, 10 сек работают 2 пользователя. 
+ 6. Если будет сервер возвращающий json, сделать выбор любого элемента из json, например: id и распечатать его в консоль. 
    { 
      "name": "Molecule Man", 
      "id": 29 
    } 
 Если несколько элементов, то например вывести в консоль id всех элементов 
{
    "members": [{
            "name": "Molecule Man",
            "id": 29
        },
        {
            "name": "Madame Uppercut",
            "id": 39
        }
    ]
}
 */