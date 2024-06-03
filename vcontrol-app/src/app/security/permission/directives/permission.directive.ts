import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[appPermission]',
  standalone: true,
  providers: [],
})
export class PermissionDirective {
  @Input() appPermission: string[] = [];
  constructor(
    private permissionService: PermissionService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  ngOnChanges() {
    this.handlePermission(this.appPermission);
  }
  handlePermission(permissions: string[]): void {
    if (permissions.length === 0) return this.createView();
    const hasPermission = permissions
      .map((permission) => {
        return this.permissionService.currentUserHasPermission(permission);
      })
      .find((hasPermission) => hasPermission);
    if (hasPermission) {
      this.createView();
      return;
    }
    this.viewContainer.clear();
  }
  createView(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
