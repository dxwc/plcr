#!/usr/bin/env node

let URL = require('url').URL;

let playlist_link = '';
let counter       = 0;
let loop          = false;

function generate(arr)
{
    arr.forEach((link) =>
    {
        if(link.match(/https:\/\/www.youtube.com\/watch\?v=.+/) !== null)
        {
            if(counter > 1)
            {
                playlist_link +=
                    ',' + new URL(link).searchParams.get('v');
            }
            else if(counter === 1)
            {
                playlist_link +=
                    '?playlist=' + new URL(link).searchParams.get('v');
            }
            else
            {
                playlist_link =
                    'https://www.youtube.com/embed/'
                    + new URL(link).searchParams.get('v');
            }

            ++counter;
        }
        else if(link === '-l' || link === '--loop')
        {
            loop = true;
        }
        else if(link === '-h' || link === '--help')
        {
            console.info('> Pass youtube video urls as arguments seperated by space');
            console.info('> Alternatively pipe the urls seperated by newline');
            process.exit(0);
        }
        else if(link === '-v' || link === '--version')
        {
            console.info('plist 0.0.1');
            process.exit(0);
        }
        else
        {
            console.error('SKIPPING INVALID URL/OPTION->', link);
            console.info();
        }
    });
}

if(process.argv.length > 2)
{
    generate(process.argv.slice(2));
    playlist_link +=
        `${counter > 1 ? '&' : '?'}rel=0${loop ? '&loop=1' : ''}&modestbranding=1`;
    console.info(playlist_link);
}
else
{
    let content = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (data) => content += data);
    process.stdin.on('_socketEnd', () =>
    {
        process.stdin.end();
        generate(content.split('\n').filter((val) => val.length));
        console.info(playlist_link);
    });
}