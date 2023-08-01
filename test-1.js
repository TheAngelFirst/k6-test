// Creator: Grafana k6 Browser Recorder 1.0.1

import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep, group } from 'k6'
import http from 'k6/http'

//export const options = { vus: 1, duration: '5m' }

export default function main() {
    let response

    let res_execution
    let res_tab_id
    let res_session_code
    let res_code
    let res_access_token

    /*     group('page_1 - https://skzs.paas.ibs.ru/', function () {
            response = http.get('https://skzs.paas.ibs.ru/', {
                headers: {
                    dnt: '1',
                    'upgrade-insecure-requests': '1',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                },
            })
            sleep(1.1)
        }) */

    group(
        'page_2 - https://sso.paas.ibs.ru/auth/realms/SKZS/protocol/openid-connect/auth?client_id=skzs&redirect_uri=https%3A%2F%2Fskzs.paas.ibs.ru%2F&state=ca7260b8-d535-42d3-83c1-b34300967cb4&response_mode=fragment&response_type=code&scope=openid&nonce=b5c8ec77-2f20-4fd0-8f16-787272ed1f75',
        function () {
            response = http.get(
                'https://sso.paas.ibs.ru/auth/realms/SKZS/protocol/openid-connect/auth?client_id=skzs&redirect_uri=https%3A%2F%2Fskzs.paas.ibs.ru%2F&state=ca7260b8-d535-42d3-83c1-b34300967cb4&response_mode=fragment&response_type=code&scope=openid&nonce=b5c8ec77-2f20-4fd0-8f16-787272ed1f75',
                {
                    headers: {
                        dnt: '1',
                        'upgrade-insecure-requests': '1',
                        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                    },
                }
            )

            res_execution = findBetween(response.body, 'execution=', ';');
            res_tab_id = findBetween(response.body, 'tab_id=', '"');
            res_session_code = findBetween(response.body, 'session_code=', ';');

            console.log('execution: ' + res_execution);
            console.log('tab_id: ' + res_tab_id);
            console.log('session_code: ' + res_session_code);

            //sleep(4.1)
        }

    )

    group(
        'page_3 - https://sso.paas.ibs.ru/auth/realms/SKZS/login-actions/authenticate?session_code=' + res_session_code + '&execution=' + res_execution + '&client_id=skzs&tab_id=' + res_tab_id,
        function () {
            response = http.post(
                'https://sso.paas.ibs.ru/auth/realms/SKZS/login-actions/authenticate?session_code=' + res_session_code + '&execution=' + res_execution + '&client_id=skzs&tab_id=' + res_tab_id,
                {
                    username: 'pm-nt99',
                    password: 'RJc-E7q-fYb-G7S',
                    credentialId: '',
                },
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        dnt: '1',
                        origin: 'null',
                        'upgrade-insecure-requests': '1',
                        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                    },
                }
            )

            //console.log('response.body: ' + response.body);

            for (const p in response.headers) {
                if (response.headers.hasOwnProperty(p)) {
                    console.log(p + ' : ' + response.headers[p]);
                }
            }
            let myResourceURL = response.headers['Content-Type'];

            console.log('Result: ' + myResourceURL);

            //console.log('response.url: ' + response.url);

            //console.log('response.headers: ' + response.headers);

            //res_code = findBetween(response.headers, 'code=', '\n');

            //console.log('code: ' + res_code);


            // response = http.post(
            //     'https://sso.paas.ibs.ru/auth/realms/SKZS/protocol/openid-connect/token',
            //     {
            //         code: '6d2ef24a-8a5b-4919-921c-1cea86dc4c8f.d7593efc-bc69-4b95-b8a6-2e3ef726988e.4ac103e4-ac59-44c0-8ee5-552038883c39',
            //         grant_type: 'authorization_code',
            //         client_id: 'skzs',
            //         redirect_uri: 'https://skzs.paas.ibs.ru/',
            //     },
            //     {
            //         headers: {
            //             'content-type': 'application/x-www-form-urlencoded',
            //             dnt: '1',
            //             'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
            //             'sec-ch-ua-mobile': '?0',
            //             'sec-ch-ua-platform': '"Windows"',
            //         },
            //     }
            // )

            // response = http.get('https://skzs.paas.ibs.ru/api/work-activity-type-groups/', {
            //     headers: {
            //         accept: 'application/json, text/plain, */*',
            //         authorization:
            //             'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
            //         dnt: '1',
            //         'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
            //         'sec-ch-ua-mobile': '?0',
            //         'sec-ch-ua-platform': '"Windows"',
            //     },
            // })

            // response = http.get('https://skzs.paas.ibs.ru/api/raw-itd-document-types/', {
            //     headers: {
            //         accept: 'application/json, text/plain, */*',
            //         authorization:
            //             'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
            //         dnt: '1',
            //         'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
            //         'sec-ch-ua-mobile': '?0',
            //         'sec-ch-ua-platform': '"Windows"',
            //     },
            // })

            // response = http.get('https://skzs.paas.ibs.ru/api/auth/user/', {
            //     headers: {
            //         accept: 'application/json, text/plain, */*',
            //         authorization:
            //             'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
            //         dnt: '1',
            //         'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
            //         'sec-ch-ua-mobile': '?0',
            //         'sec-ch-ua-platform': '"Windows"',
            //     },
            // })

            // response = http.get('https://skzs.paas.ibs.ru/api/bk-system-users/subscription/', {
            //     headers: {
            //         accept: 'application/json, text/plain, */*',
            //         authorization:
            //             'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
            //         dnt: '1',
            //         'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
            //         'sec-ch-ua-mobile': '?0',
            //         'sec-ch-ua-platform': '"Windows"',
            //     },
            // })

            // response = http.get('https://skzs.paas.ibs.ru/api/projects/', {
            //     headers: {
            //         accept: 'application/json, text/plain, */*',
            //         authorization:
            //             'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
            //         dnt: '1',
            //         'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
            //         'sec-ch-ua-mobile': '?0',
            //         'sec-ch-ua-platform': '"Windows"',
            //     },
            // })
            sleep(6.2)
        }
    )

    // group(
    //     'page_4 - https://skzs.paas.ibs.ru/projects/c3112795-599c-4744-acc8-3d2b42ed2f66',
    //     function () {
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/documents/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/users/?project=c3112795-599c-4744-acc8-3d2b42ed2f66',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/companies/?project=c3112795-599c-4744-acc8-3d2b42ed2f66',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/welding-passport/picket/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/welding-passport/?limit=8',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         sleep(3.4)
    //     }
    // )

    // group(
    //     'page_5 - https://skzs.paas.ibs.ru/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/section/journal-list',
    //     function () {
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/journal/as/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         sleep(4.1)
    //     }
    // )

    // group(
    //     'page_7 - https://skzs.paas.ibs.ru/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/section/normative-documents/group/98c0af9b-c1db-4b39-a3e2-2e1307188b0b',
    //     function () {
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/98c0af9b-c1db-4b39-a3e2-2e1307188b0b/maps/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/documents/normative-documents/?limit=20&page=1&order=desc&orderby=upload_date&category=98c0af9b-c1db-4b39-a3e2-2e1307188b0b',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/documents/extensions/?category=98c0af9b-c1db-4b39-a3e2-2e1307188b0b',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/98c0af9b-c1db-4b39-a3e2-2e1307188b0b/itd-info',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/98c0af9b-c1db-4b39-a3e2-2e1307188b0b/cc-doc-count',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         sleep(2.4)
    //     }
    // )

    // group(
    //     'page_9 - https://skzs.paas.ibs.ru/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/section/activities/group/16816d24-48e9-481e-a797-f26e6811f352',
    //     function () {
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/16816d24-48e9-481e-a797-f26e6811f352/calendar/?date=2023-07-29',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/16816d24-48e9-481e-a797-f26e6811f352/work-activity-categories/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/msg-approve/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/16816d24-48e9-481e-a797-f26e6811f352/itd-info',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/16816d24-48e9-481e-a797-f26e6811f352/calendar/?date=2023-07-29',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/16816d24-48e9-481e-a797-f26e6811f352/work-activity-categories/',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //         response = http.get(
    //             'https://skzs.paas.ibs.ru/api/projects/c3112795-599c-4744-acc8-3d2b42ed2f66/categories/16816d24-48e9-481e-a797-f26e6811f352/cc-doc-count',
    //             {
    //                 headers: {
    //                     accept: 'application/json, text/plain, */*',
    //                     authorization:
    //                         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZSE0yRUEzdlJiTTg4U3RWVTZueUh5SWgzaVJHSHBlYU95QUFKQm05WF9NIn0.eyJleHAiOjE2OTA5MDY4MjQsImlhdCI6MTY5MDkwNjUyNCwiYXV0aF90aW1lIjoxNjkwOTA2NTIzLCJqdGkiOiIwZGMxYzZhOC02OWYyLTQ0MDUtYjNjZC00OTVhMjE1ZTQ4MDciLCJpc3MiOiJodHRwczovL3Nzby5wYWFzLmlicy5ydS9hdXRoL3JlYWxtcy9TS1pTIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVkMTRjNjI5LWVmYzMtNGI3My1hZGQ4LWI2ZWQ2YzIxZWRlNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNrenMiLCJub25jZSI6ImI1YzhlYzc3LTJmMjAtNGZkMC04ZjE2LTc4NzI3MmVkMWY3NSIsInNlc3Npb25fc3RhdGUiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtU0taUyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNzU5M2VmYy1iYzY5LTRiOTUtYjhhNi0yZTNlZjcyNjk4OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQkNC70LXQutGB0LXQuSDQkNC70LXQutGB0LXQtdCy0LjRhyIsInNrenMtZ3JvdXBzIjpbIi9TS1pTX0dFTkVSQUwtVEVTVCIsIi9TS1pTX1BNLURFViJdLCJjb21wYW55Ijoi0J_QkNCeIMKr0JPQsNC30L_RgNC-0Lwg0L3QtdGE0YLRjMK7IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG0tbnQxIiwiZ2l2ZW5fbmFtZSI6ItCQ0LvQtdC60YHQtdC5IiwiZmFtaWx5X25hbWUiOiLQkNC70LXQutGB0LXQtdCy0LjRhyIsImVtYWlsIjoicG0tbnQxQHlhLnJ1In0.jVei2EABq7-pPmcFPgbiaZMeJ3Uq9apMjpCwBftRSFOrpcSahBoawuMxmbQ1R6InPbxUb6XMVKZ5EGQoqjqNRm7FapeThpi8UpY9NeigY-RmLNZupvOX6ucX6A3XzdI7bSvIbmdeEBhUtA2fJSsp9SpK7uhH9nn2z_h3qpPzV5-1SnXqAqlLqEREULh26PsY0aj-OMEI-8qE18RVDaFLczS0LI8ssyDpRbTrSTUMPAKg4dPH5FPXuLldYCP4hvQrJWFbwNtg9HwgsrCkdgY9zscIWDDBbbrDybvr8ZXIJYb3q8AQ8wov_1K0qMk2DCcaeCdoj2_L5c1LEgXCaErsgw',
    //                     dnt: '1',
    //                     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "YaBrowser";v="23"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                 },
    //             }
    //         )
    //     }
    // )
}