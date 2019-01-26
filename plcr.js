#!/usr/bin/env node

const vd = require('vid_data');
const pl = require('ytpl');

const help_text =
`Usages:

    plcr [options] url1 url2 url2...
    plcr --import <playlist url>
    plcr --importx <playlist url> <file location to save html>

    -l, --loop          Set playlist to loop when ends
    -a, --autostart     Set playlist to start playing automatically
    -p, --pipe          Use to pipe line seperated URLs
    -s, --shhh          Only print playlist output and nothing else
    -v, --version       Prints running version
    -h, --help          Display this help

Supported video URL format example to make playlist :

    https://www.youtube.com/watch?v=ZiXZsMIVGos
    https://www.youtube.com/embed/ZiXZsMIVGos
    https://youtu.be/ZiXZsMIVGos

Supported video URL format example to import or save :

    https://www.youtube.com/watch?v=kBdfcR-8hEY&list=PL72C62342291D5DAE
    https://www.youtube.com/playlist?list=PL72C62342291D5DAE

Note:

- Redirecting URL list via standard input is also allowed
- Above formatted URLs with additional path or parameters are also allowed
- For URLs with parameters, remember to put quotation around URL to
  prevent your terminal emulator or command line application errors
- To update, run: npm update -g plcr
- To uninstall, run: npm uninstall -g plcr
- To reinstall, run: npm install -g plcr

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

plcr version 1.1.0
Send bug report here : https://github.com/dxwc/plcr/issues
`;

let opt =
{
    version   : false,
    loop      : false,
    autostart : false,
    pipe      : false,
    shhh      : false
}

let list = [];
let id;

process.argv.splice(0, 2);

if
(
    process.argv.length >= 2 &&
    process.argv[0] === '-i' ||
    process.argv[0] === '--import' ||
    process.argv[0] === '-ix' ||
    process.argv[0] === '-improtx'
)
{
    import_playlist
    (
        process.argv[1],
        (process.argv[0] === '-ix' || process.argv[0] === '-improtx')
    )
    .then(() =>
    {
        process.exit(0);
    });
}
else
{
    process.argv.forEach((one) =>
    {
        one = one.toLocaleLowerCase();

        if
        (
            one === '-i' ||
            one === '--import'
        )
        {
            console.info('INVALID USE. See --help');
            process.exit(1);
        }
        else if
        (
            one === '-v' ||
            one === '--version'
        )
        {
            console.info('plcr 1.0.2');
            process.exit(0);
        }
        else if
        (
            one === '-h' ||
            one === '--help'
        )
        {
            console.info(help_text);
            process.exit(0);
        }
        else if
        (
            one === '-l'    ||
            one === '--loop'
        )
        {
            opt.loop = true;
        }
        else if
        (
            one === '-a'    ||
            one === '--autostart'
        )
        {
            opt.autostart = true;
        }
        else if
        (
            one === '-p' ||
            one === '--pipe'
        )
        {
            opt.pipe = true;
        }
        else if
        (
            one === '-s'    ||
            one === '--sh'  ||
            one === '--shh' ||
            one === '--shhh'
        )
        {
            opt.shhh = true;
        }
        else
        {
            process_one(one);
        }
    });

    delete process.argv;

    if(opt.pipe) on_pipe().then(() => process_list());
    else         process_list();
}

/////////////////////////////////////////////////////////////////////////////////

function process_list()
{
    if(list.length === 1)
    {
        if(!opt.shhh) console.info(`Playlist link:\n`)
        console.info(`https://www.youtube.com/watch?v=` + list[0]);
    }
    else if(list.length)
    {
        if(!opt.shhh) console.info(`Playlist link:\n`)
        console.info
        (
            `https://www.youtube.com/embed/${list[0]}` +
            `?playlist=${list.slice(1).join(`,`)}`     +
            `&rel=0&modestbranding=1`                  +
            `${opt.loop ? '&loop=1' : ''}`             +
            `${opt.autostart ? `&autoplay=1` : '' }`
        );
    }
    else
    {
        if(!opt.shhh) console.info(help_text);
        process.exit(1);
    }
}

function process_one(input)
{
    if(!input.trim().length) return;
    id = vd.get_video_id(input);

    if(id)             list.push(id);
    else if(!opt.shhh) console.error(`SKIPPING INVALID OPTION/URL:`, input);

    id = null;
}

function on_pipe()
{
    return new Promise((resolve, reject) =>
    {
        let content = '';
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', (data) => content += data);
        process.stdin.on('end', () =>
        {
            content.split('\n').forEach((val) => process_one(val));
            resolve();
        });
    })
    .catch((err) =>
    {
        if(!opt.shhh)
        {
            console.error(`Unexpected error:`);
            console.error(err);
        }
    });
}

async function import_playlist(url, importx)
{
    let playlist_id = await vd.get_playlist_id(url);
    if(!playlist_id)
    {
        console.error(`Failed. Not a recognizable youtube URL`);
        process.exit(1);
    }

    let arr;
    let meta = { };
    try
    {
        arr = await pl(playlist_id, { limit : 100000 });
    }
    catch(err)
    {
        console.error(err.message ? err.message : `Failed. Could not parse data`);
        process.exit(1);
    }

    if
    (
        !arr ||
        !arr.items ||
        arr.items.constructor !== Array ||
        arr.items.length === 0
    )
    {
        console.error(`Failed. Could not parse data`);
        process.exit(1);
    }

    meta.url = arr.url;
    meta.title = arr.title;

    arr = arr.items;

    arr.forEach((vid) => list.push(vid.id));
    if(!importx) return process_list();

    let generated = '';

    list.forEach((id, i) =>
    {
        generated +=
`
<h3 id='${i+1}'><a href='#${i+1}'>⬐${i+1}⬎</a></h3>
<a target='_blank' href='https://www.youtube.com/watch?v=${id}'>
    <img src='https://img.youtube.com/vi/${id}/mqdefault.jpg'>
</a>
<!--
<span class='video'>
<iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/${id}"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</span> -->`
    });


    let fs = require('fs');
    let path = require('path');
    let write_to = process.argv[2];

    if(!write_to) write_to = path.join(__dirname, playlist_id + '.html');

    try
    {

        fs.writeFileSync
        (
            write_to,
`<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>${meta.title}</title>
    <style>
        html, body
        {
            margin: 0;
            padding: 0;
            top: 0;
            left: 0;
            border: 0;
            max-width: 100%;
            overflow-x: hidden;
            margin-bottom: 2%;
        }

        body *
        {
            display: table;
            margin: 0 auto;
        }

        .video
        {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
            margin-bottom: 1%;
        }

        .video iframe
        {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        h3 a
        {
            text-decoration: none;
            border: 0;
        }
    </style>
</head>
<body>
<h1>${meta.title}</h1>
<a target='_blank' href='${meta.url}'>Original Playlist Link</a>
${generated}
</body>
</html>`,
        {
            encoding : 'utf-8'
        });

        console.log(`Saved file: ${write_to}`);
    }
    catch(err)
    {
        console.error('Failed to write at given file path');
    }
}