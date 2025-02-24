import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { Contents } from '../../core/mock-model/contents';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-table-of-contents',
  imports: [TreeModule],
  templateUrl: './table-of-contents.component.html'
})
export class TableOfContentsComponent implements OnInit {
    contentsData: Contents[] = [];
    contents: TreeNode<Contents>[] = [];
    flatContents: TreeNode<Contents>[] = [];
    selectedContent: TreeNode<Contents> | null | undefined = null;
    
    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  
    ngOnInit(): void {
        this.router.events.subscribe((e) => {
            if (e instanceof RoutesRecognized) {
                // when route change because user clicked on an article link
                // or because address bar manually updated
                // we get the article id to update the table of contents selected node
                const id = e.state.root.firstChild?.firstChild?.paramMap.get("id");
                this.selectNodeFromUrlId(id);
            }
        })
        
        // docData is provided by ContentResolver declared in app.route
        this.activatedRoute.data.subscribe(({ docData }) => {
            if (docData) this.initialize(docData);
            const id = this.activatedRoute.parent?.firstChild?.snapshot.paramMap.get("id");
            this.selectNodeFromUrlId(id);
        });
    }
    
    initialize(data: Contents[]): void {
        this.contentsData = data;
        const roots = data.filter(x=> x.parentId == null);
        roots.forEach(e => {
            const newEntry = {label: e.name, data: e};
            this.contents.push(newEntry);
            this.loadChildren(data, newEntry);
            this.flatContents.push(newEntry);
        });

        this.selectedContent = this.contents[0];
    }

    selectNodeFromUrlId(id: string | null | undefined): void {
        if (id) this.selectedContent = this.flatContents.find(x=> x.data?.id === id);
        this.expandParentsRecursively(this.selectedContent);
    }

    expandParentsRecursively(node: TreeNode<Contents> | null | undefined): void {
        if (!node) return;
        if (node.parent) {
            node.parent.expanded = true;
            this.expandParentsRecursively(node.parent);
        }
    }

    loadChildren(data: Contents[], parent: TreeNode): void {
        const children = data.filter(x=> x.parentId === parent.data.id);
        if (children.length > 0) {
            parent.children = [];
            children.forEach(c => {
                const newEntry = {label: c.name, data: c, parent: parent};
                // using a flat panel facilitates selection but increases memory usage - your choice
                this.flatContents.push(newEntry);
                parent.children?.push(newEntry);
                this.loadChildren(data, newEntry);
            });
        }
    }

    async selectedContentChange(): Promise<void> {
        if (!this.selectedContent?.data) return;
        this.router.navigate([{ outlets: { article: this.selectedContent.data.id } }], {relativeTo: this.activatedRoute.parent});
    }
}
