// Creator: Grafana k6 Browser Recorder 1.0.1

import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep, group, check } from 'k6'
import http from 'k6/http'
import * as config from './config.js'

//export const options = { vus: 1, duration: '5m' }

export default function main() {
    let response

    let r_token

    group(config.HOST, function () {
        response = http.get(config.HOST, {
            headers: {
                dnt: '1',
                'upgrade-insecure-requests': '1',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
            },
        })

        r_token = findBetween(response.body, '<h1 id=\"token\">token=', '</h1>');

        console.log('token: ' + r_token);

        check(r_token, {
            'token exists': (t) => t != null,
        });

        check(response, {
            'is status 200': (r) => r.status === 200,
        });


        sleep(1.1)
    })

}

/* 
 console.log(res.json());
1. Сделать несколько запросов: 1 GET и 1 POST (желательно json). Учитывать, что host у endpoint может меняться под стенд тестирования для всех запросов сразу. 
2. Исходить из того, что например запрос GET (это условно авторизация) и полученный в GET ответ (в данном случае можно объявить самому переменную токен=тест) мы должны дальше передавать как токен в POST в хедерах, например 'Authorization': токен (и таких запросов POST может быть много в скрипте). 
3. Сделать передачу headers (get и post) с учетом того, что могут меняться отдельные параметры хедеров у разных запросов, например Content-Type разный у get (text/html) и post (application/json). 
4. Сделать передачу body (post) исходя из того, что содержимое body динамическое. 
5. Сделать два сценария запуска этих двух запросов. Например: 1 виртуальный пользователь 1 итерация. И: 10 сек stage ни одного пользователя, 10 сек работают 2 пользователя. 
6. Если будет сервер возвращающий json, сделать выбор любого элемента из json, например: id и распечатать его в консоль. 
    { 
      "name": "Molecule Man", 
      "id": 29 
    } 
 Если несколько элементов, то например вывести в консоль id всех элементов 
  "members": [ 
    { 
      "name": "Molecule Man", 
      "id": 29 
    }, 
    { 
      "name": "Madame Uppercut", 
      "id": 39, 
    } 
    ]

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