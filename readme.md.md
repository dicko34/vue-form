# CioForm

## The Shapely form we need


Using CioForm, you don't have to worry about creating a form and its properties. This is because it is responsive across all devices, and has an easy, elegant syntax, saving you time and effort. We’ve already laid the foundation to adjust your form with a bit of effort. The Shapely chapter allows you to edit all basic properties on your form. The documentation below will help you out




## Features

- input validation

- Mask phone number

- Dynamic

- Mail sender

- Save the message in a text file

- Telegram bot sender

- Visitor country sender

- Visitor city sender

- Message TIME / DATE

- Smart Error Handling

- Redirect to the Success Page

- Visitor IP Localization

- Send without a reference.

- - addtional to

 Fastest Rendering

 Edit label & placholder Name

 Side section

 Customizing

 Validation

 Scalable

 Responsive

 Easy syntex

 21 important brand svg logos

 15 a necessary general SVG logo

 Clean code

 Kindly font

 Dynamic fields


## Tech


CioForm uses a the most web development libraries & frameworks for better performance:


- [VueJs] - An approachable, performant and versatile framework for building web user interfaces.

- [jQuery] - jQuery is a fast, small, and feature-rich JavaScript library.

- [AJAX] - allows us to load data from the server without a browser page refresh.


## Development

#### the front side

Want to contribute? Great!

Make a change to your file and instantly see your updates!


Open your favorite IDE and follow the steps.


First Step:

 Copy "/contact" directory to your project

 

Second Step:

add the below secript to the place u wanna the template show on

```html

    <div id="lu-app">

        <div id="lu-form">

        </div>

        <style scoped>

            @import url('assets/css/main.css');

        </style>

    </div>

```


Third Step:

Add the below secript to the bottom of the body tag

```html

    <script src="assets/js/vue.globale.min.js"></script>

    <script  src="assets/js/jquery.min.js"></script>

    <script  src="assets/js/home.js"></script>

```


#### the server side

First Step:

add ur email to "setup.ini" file

```ini

email = "email@example.com"

```


Second Step:

 Add  message subject to 'subject' in "setup.ini" file

```ini

subject = "CioForm"

```


Third Step:

Add saved message file name to 'file' in "setup.ini" file


```sh

file = "messages.txt"

```


Fourth Step: 

Add ur bot telegram info to "setup.ini" file

```sh

token = "BOT_TOKEN"

chat_id = "123456789"

```

 to make your own bot


- go to https://telegram.me/BotFather

- Choose the command /newbot

- type ur bot name e.g 'avbotDyc'

- type your bot username e.g avbotDyc_bot if the user already taken choose other username

- to get ur chat id

- go to https://t.me/get_my_telegram_chat_id_bot and click on start



## The core


### Setup

#### front Side Config

##### reverse `String` `required`

Reverse sections positions.


##### background `String` `required`

form background color


##### color `String` `required`

form color


##### title `String` `required`

form title color


##### border color `String` `required`

form border color


##### borderWidth `String` `required`

form border width


##### fields `Object` `{el,type,label,placeholder,borderColor,numberMask}` `required`

form fields `input` `/` `textarea`

for inline inputs, add your filled properties as element into the arrays .


setup

```javascript

 {

    el: [],

    name: [],

    type: [],

    label: [],

    placeholder: [],

    length: [],

    require: {

        enable: ],

        text: []

    },

    regex : []

    numberMask : []

 }

```

###### result

&nbsp;

| label | label | label |

| ----- | ----- | ----- |

| input | input | input |

-----

###### rules

 - don't matter about the order of properties.

 - Must push all the values into an array `[]` to render.

 - all arrays have the same number of elements

 - ```regex``` property don't work if you don't have element email type  ``` type : ["email"] ```

 - ```numberMask``` property don't work if u don't have element phone number type  ``` type : ["phone_number"]```

 

Good ✅

```javascript

placeholder: ["input placeholder"],

type : ["text"],

el : ["textarea"]

```


Bad ❌

```

 el: ["input"], // 1 element

 name: ["input1","input2"], // 2 element

```

Bad ❌

```

 el: "input", // 1 elements

 name: "input1", // 2 elememnt

```

Bad ❌

```

{

    el: ["input", ""],

    name: ["something"],

    type: ["text","text","phone_number"],

    label: "am label",

    placeholder: ["First", "Last","bad","badAlso"],

    length: 50,

    require: {

        enable: [false, "true"],

        text: ["cannot be empty"]

    },

 }

 


```

--------

Good ✅

```javascript

 {

    el: ["input", "input"],

    name: ["first-", "second"],

    type: [,"phone_number","email"],

    label: ["Phone number","Email"],

    placeholder: ["number","email"],

    length: [50, 50],

    require: {

        enable: [true, true],

        text: ["Phone number cannot be empty", "invalid email"]

    },

    regex : ["","",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]

    numberMask: ["","(xxx) xxx-xxx",""]

 }

```

result


| label | label

| ----- | -----

| input | input

-----



###### el `Array` `[String]` `required`

filed tag `input/textarea`

###### type `Array` `[String]` `required`

filed tag `text/phone_number`

###### label `Array` `[String]` `required`

lebel text

###### placeholder `Array` `[String]` `required`

filed tag `input/textarea`

###### borderColor `Array` `[String]` `required`

bottom border color .

###### numberMask `Array` `[String]` `required`

mask number (for phone_number input type) .


##### button  `Object` `{content,color,background,fontSize,width,height,borderRadius,action()}` `required`

###### content `String` `required`

button text

###### color `String` `required`

button color

###### background `String` `required`

button background color

###### fontSize `String` `required`

button fontt size

###### width `String` `required`

button width

###### height `String` `required`

button height

###### borderRadius `String` `required`

button border radius

###### action `Function`  `(url=post.php,redirect=false)` `required`

the action you get when you click on button

 > default

>> before post the data to ``` url ```, the loading window will appear if you enable it.


>> after fetching the data if the opertion took the success way, the success window will appear if you enable it and after moments will redirect you  to the ``` redirect!=false ``` link.


>> if the opertion get response error from the front side  or the front side, the fail window will appear if you enable it.

- ```url``` ` Param` : allow you to set the data response file

- ```redirect``` ` Param` : allow you to set the redirect location after getting success response


##### loading `Object` `{enable,src}` `required`

###### enable `Boolean` `required`

`true` to enable, `false` to disable

###### src `String` `required`

loading image source

##### success `Object` `{enable,src}` `required`

###### enable `Boolean` `required`

`true` to enable, `false` to disable

###### src `String` `required`

loading image source


##### fail `Object` `{enable,src}` `required`

###### enable `Boolean` `required`

`true` to enable, `false` to disable

###### src `String` `required`

loading image source



## License


Copyright (c) 2023 [Ricko34sync](https://t.me/ricko34Sync)


   [AJAX]: <https://api.jquery.com/jquery.ajax/r>

   [jQuery]: <http://jquery.com>

   [VueJS]: <https://vuejs.org/>