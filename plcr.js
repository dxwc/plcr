#!/usr/bin/env node

const vd = require('vid_data');

const help_text =
`Usages:

    plcr [options] url1 url2 url2...

    -l, --loop          Set playlist to loop when ends
    -a, --autostart     Set playlist to start playing automatically
    -p, --pipe          Use to pipe line seperated URLs
    -s, --shhh          Only print playlist output and nothing else
    -v, --version       Prints running version
    -h, --help          Display this help

Supported URL format example :

    https://www.youtube.com/watch?v=ZiXZsMIVGos
    https://www.youtube.com/embed/ZiXZsMIVGos
    https://youtu.be/ZiXZsMIVGos

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

plcr version 1.0.0
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

process.argv.forEach((one) =>
{
    one = one.toLocaleLowerCase();

    if
    (
        one === '-v' ||
        one === '--version'
    )
    {
        console.info('plcr 1.0.0');
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