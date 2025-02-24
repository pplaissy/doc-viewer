import { Injectable } from "@angular/core";
import { Contents } from "../../mock-model/contents";
import { Observable, of } from "rxjs";
import { Article } from "../../mock-model/article";

const contentsMock: Contents[] = [
    {
        id: "welcome",
        name: "Welcome",
        parentId: null
    },
    {
        id: "first-topic",
        name: "Sed luctus vel",
        parentId: null
    },
    {
        id: "second-topic",
        name: "Fusce bibendum",
        parentId: null
    },
    {
        id: "third-topic",
        name: "Suspendisse auctor",
        parentId: null
    },
    {
        id: "1.0.0",
        name: "Etiam nibh ex",
        parentId: "first-topic"
    },
    {
        id: "1.1.0",
        name: "Nunc in luctus leo",
        parentId: "first-topic"
    },
    {
        id: "1.0.1",
        name: "Mauris justo tellus",
        parentId: "1.0.0"
    },
    {
        id: "2.0.0",
        name: "Nulla sollicitudin",
        parentId: "second-topic"
    },
    {
        id: "2.1.0",
        name: "Praesent mollis",
        parentId: "second-topic"
    },
    {
        id: "3.0.0",
        name: "Aenean et euismod mauris",
        parentId: "third-topic"
    }
];

const articlesMock: Article[] = [
    {
        id: "welcome",
        title: "Welcome",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida sagittis risus eget aliquam. Duis magna orci, euismod ac faucibus eget, pharetra sed ligula. Donec placerat molestie eros eget luctus. Mauris mollis auctor pulvinar. Cras dictum ac dui convallis feugiat. Sed et purus accumsan leo pulvinar ullamcorper. Proin aliquam ex eros, at tincidunt elit blandit a. Suspendisse malesuada at arcu vel commodo. Quisque efficitur laoreet vehicula. Nulla a nunc leo. Mauris ut velit non arcu ornare dignissim. In hac habitasse platea dictumst. Cras semper rutrum viverra. Phasellus nec nunc aliquam, pharetra mi sed, pretium enim.",
        link: null
    },
    {
        id: "first-topic",
        title: "Sed luctus vel",
        content: "Sed luctus vel mauris quis laoreet. Sed elementum elementum bibendum. Quisque imperdiet lacinia massa in egestas. Sed ut fringilla felis, non fermentum turpis. Fusce in pellentesque sem. Integer eu porttitor dolor, in sodales justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        link: null
    },
    {
        id: "second-topic",
        title: "Fusce bibendum orci",
        content: "Fusce bibendum orci ut est semper, eu rhoncus ipsum rutrum. Vestibulum euismod pharetra suscipit. Vivamus quam erat, lobortis in ex pulvinar, pharetra sollicitudin metus. Pellentesque quis ipsum vel orci blandit faucibus. Integer elementum est nec accumsan pellentesque. Integer egestas lacus ac faucibus eleifend. Aliquam congue volutpat gravida. In vel cursus risus, sit amet rhoncus augue. Vivamus nisl erat, rutrum id sem eu, varius accumsan mauris. Pellentesque vulputate libero et nisl interdum, nec porta eros facilisis. Sed molestie sem interdum nisi lobortis rhoncus. Mauris rutrum nulla quis egestas aliquet. Praesent id aliquet enim, nec bibendum odio.",
        link: "3.0.0"
    },
    {
        id: "third-topic",
        title: "Suspendisse auctor",
        content: "Suspendisse auctor ut erat vel suscipit. Nunc commodo ultricies urna sed pellentesque. Pellentesque porta porta consequat. Nulla a sapien eros. Curabitur placerat massa a odio pellentesque, molestie maximus orci sagittis. Nulla aliquam rhoncus nulla eu scelerisque. Praesent maximus ullamcorper consectetur. Ut eget pellentesque risus. Nulla ultrices lorem ut felis placerat, non facilisis lorem gravida. Nam varius, quam a elementum efficitur, quam libero tincidunt velit, suscipit porta enim velit sit amet lacus. Ut tempus nunc semper ex ornare, sed dictum sem gravida. Nulla malesuada tortor in ipsum egestas faucibus.",
        link: "1.0.1"
    },
    {
        id: "1.0.0",
        title: "Etiam nibh ex",
        content: "Etiam nibh ex, porta a eleifend in, malesuada nec sapien. Nunc dignissim tortor in sapien gravida congue. Nam nec magna vitae nulla aliquet porta. Nullam aliquam erat ac egestas bibendum. Integer consequat ullamcorper tellus. Maecenas congue dignissim lacus, non condimentum leo convallis id. Fusce bibendum est dui, vel volutpat justo lacinia sit amet.",
        link: null
    },
    {
        id: "1.1.0",
        title: "Nunc in luctus leo",
        content: "Nunc in luctus leo. Mauris et lorem diam. Duis non justo ante. Vivamus auctor pulvinar metus et facilisis. Nam quis nisl leo. Pellentesque ante massa, ultrices vitae dui id, semper porttitor eros. Donec sit amet elit pretium, congue libero ac, porttitor est. Aenean eu iaculis erat, non rutrum libero. Etiam cursus tincidunt nulla vel vestibulum. Curabitur lacinia lobortis molestie. Morbi ultrices, dui a convallis condimentum, elit neque vestibulum nulla, vel consequat lacus metus et ipsum. Ut nec rhoncus libero. Sed egestas nisl dui, id tristique enim luctus vulputate.",
        link: "2.1.0"
    },
    {
        id: "1.0.1",
        title: "Mauris justo tellus",
        content: "Mauris justo tellus, gravida at dui et, pulvinar finibus dolor. Suspendisse turpis dolor, lacinia ut ipsum quis, malesuada congue risus. In pharetra felis tincidunt ex elementum, quis commodo leo auctor. Vestibulum nec nunc arcu. Vestibulum ultricies vehicula enim, hendrerit rutrum felis maximus vitae. Maecenas lorem justo, ultrices at sem sit amet, vulputate condimentum dui. Mauris porta massa eget tempus ultrices. Phasellus dolor libero, ornare non ultrices ac, vulputate id purus. Praesent vestibulum lectus eget lacinia viverra. Aliquam sit amet risus convallis, vehicula est et, aliquam urna. Etiam maximus ultrices nibh, vitae varius leo pulvinar id. Nunc interdum, est ut cursus finibus, arcu neque sollicitudin odio, eget tincidunt mauris enim vel purus. Nulla libero ante, dignissim at dolor eget, porttitor aliquam ex.",
        link: "3.0.0"
    },
    {
        id: "2.0.0",
        title: "Nulla sollicitudin",
        content: "Nulla sollicitudin nulla libero, eu auctor tellus suscipit at. Nullam mattis sem in sapien pulvinar suscipit. Integer et vulputate lectus. Ut in ornare libero, eu rutrum metus. Mauris dapibus justo sed laoreet iaculis. Ut eu leo efficitur orci lobortis cursus et vel tortor. Duis lacus quam, dapibus ut odio in, commodo venenatis nisi. Donec at diam fermentum, luctus felis vitae, pellentesque justo. Aenean scelerisque ipsum in tortor rutrum, vitae efficitur metus semper. Nullam auctor, mi sed condimentum imperdiet, risus metus pretium libero, id egestas ipsum ipsum nec risus. Vivamus consequat nulla est, non semper neque condimentum ut. Duis sed urna suscipit, dignissim nisi eget, tincidunt nisi. Curabitur at ultrices mi. Donec odio diam, facilisis sagittis semper eget, facilisis nec sapien. Pellentesque nec risus ullamcorper, consectetur libero non, cursus nibh.",
        link: null
    },
    {
        id: "2.1.0",
        title: "Praesent mollis",
        content: "Praesent mollis, massa ac lacinia egestas, odio nulla ullamcorper odio, quis pellentesque est sapien ut libero. Phasellus venenatis sodales quam sit amet faucibus. Pellentesque in ultricies nisi. Cras porttitor neque eget porta molestie. Suspendisse vel mattis libero, nec dapibus dolor. Phasellus lectus justo, maximus et mattis vel, condimentum ac augue. Donec sagittis nunc vitae nisl venenatis ornare. Integer quam lacus, hendrerit ut sollicitudin ac, laoreet et purus. Nam gravida vulputate nisi, eu tincidunt nulla mollis non. Aliquam vulputate aliquam sapien id hendrerit. Donec porta justo quis sapien porta ullamcorper. Sed tempor odio ipsum, eget fringilla ex mollis iaculis.",
        link: null
    },
    {
        id: "3.0.0",
        title: "Aenean et euismod mauris",
        content: "Aenean et euismod mauris. Ut sodales tempus tortor, non accumsan lectus porttitor sed. Curabitur sed neque non tellus fermentum congue. Vivamus vel tincidunt tortor. Nulla molestie malesuada felis, non faucibus neque euismod malesuada. Nunc faucibus eu lorem ac ornare. Nunc vel semper sapien, id placerat erat. Mauris vehicula metus et tortor cursus dictum. Aliquam in ex ullamcorper, venenatis erat nec, cursus odio.",
        link: "1.1.0"
    }
]

@Injectable({
    providedIn: 'root'
})
export class DocApi {
    constructor() { }

    // to be replace by real world api requests
    getContents$(): Observable<Contents[]> {
        return of(contentsMock);
    }

    // to be replace by real world api requests
    getDocument$(articleId: string): Observable<Article> {
        let article = articlesMock.find(x => x.id === articleId);
        if (!article) {
            article = {id: "not-found", title: "Article not found", content: "Something broken, sorry", link: null};
        }
        return of(article);
    }
}