import { marked } from 'marked';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import styles from './legacy.component.scss';

// the source of the readme and the reflection data
type ComponentData = {
  readme: string;
  reflection: any;
};

type Viewport = 'mobile' | 'tablet' | 'desktop' | 'wide';

const debounce = (fn: (...args: unknown[]) => unknown, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const iconMap = new Map<Viewport, string>([
  ['mobile', 'smartphone'],
  ['tablet', 'laptop'],
  ['desktop', 'screen'],
  ['wide', 'screen-wide'],
]);

const viewportMap = new Map<Viewport, [number, number]>([
  ['mobile', [390, 844]],
  ['tablet', [1024, 768]],
  ['desktop', [1280, 800]],
  ['wide', [1920, 1080]],
]);

@customElement('wcp-legacy')
export class Legacy extends LitElement {
  static readonly styles = unsafeCSS(styles);

  readonly componentExpression = /\/([-\w\d]+)\/preview.html$/i;

  private reflectionData?: { children: { sources: { fileName: string }[] }[] };

  @state()
  private activeLink = '';

  @state()
  private componentMetaData: Record<string, string> = {};

  @state()
  private componentDetails?: ComponentData;

  @query('.preview')
  preview!: HTMLDivElement;

  @query('iframe')
  iframe!: HTMLIFrameElement;

  @property({ type: String, reflect: true, attribute: 'simulate-viewport' })
  private simulateViewport?: Viewport;

  @property({ type: Boolean, reflect: true, attribute: 'invert-simulated-viewport' })
  invertSimulatedViewport = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-component-details' })
  hasComponentDetails = false;

  @property({ type: Boolean, reflect: true, attribute: 'hide-aside' })
  hideAside = false;

  @property({ type: Boolean, reflect: true, attribute: 'hide-component-details' })
  hideComponentDetails = false;

  @property({ type: Boolean, reflect: true, attribute: 'expand-component-details' })
  expandComponentDetails = false;

  @property({ type: Array })
  set components(components: string[]) {
    this.componentMetaData = this.getPreviewMetaData(components, this.componentExpression);
  }

  handleResize = debounce(this.setPreviewScale.bind(this), 500);

  constructor() {
    super();

    // set from global initially
    this.components = [];

    // watch screen size to align scaling
    window.addEventListener('resize', this.handleResize);
  }

  getPreviewMetaData(paths: string[], matcher: RegExp): Record<string, string> {
    return paths
      .filter((entry) => entry.match(matcher))
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce((acc, entry) => {
        const [, component] = entry.match(matcher)!;
        return { ...acc, [component]: entry.replace(/^\/?src/, '') };
      }, {});
  }

  getCurrentUrl(): string {
    return location.hash.replace(/^#/, '');
  }

  async resolveComponent(path: string): Promise<ComponentData | undefined> {
    // try to resolve the component kebab-case name from the path
    const [name, preview] = Object.entries(this.componentMetaData).find(([, preview]) => path.endsWith(preview)) || [];
    // try to find reflection meta data for the component
    const fileName = `${name}.component.ts`;
    const reflection = this.reflectionData?.children?.find(({ sources }) => sources?.[0]?.fileName.endsWith(fileName));
    // nothing found
    if (!name || !reflection) return;
    // fetch the readme
    const readmePath = preview?.replace(/^(.*\/).*?\.html$/, '$1README.md');
    const response = await fetch(readmePath!);
    const readme = await response.text();

    return { readme, reflection };
  }

  openLink(path: string) {
    history.pushState(null, '', `#${path}`);
    this.iframe.src = path;
    this.activeLink = path;
  }

  reloadIframe() {
    this.iframe.contentWindow!.location.href = this.getCurrentUrl();
  }

  setPreviewSize() {
    if (this.simulateViewport === undefined) return;
    const [w, h] = viewportMap.get(this.simulateViewport)!;
    this.style.setProperty('--wcp-viewport-height', `${this.invertSimulatedViewport ? w : h}`);
    this.style.setProperty('--wcp-viewport-width', `${this.invertSimulatedViewport ? h : w}`);
  }

  setPreviewScale() {
    if (this.simulateViewport === undefined) return;
    const [w, h] = viewportMap.get(this.simulateViewport)!;
    const scale = Math.min(
      this.preview.clientWidth / (this.invertSimulatedViewport ? h : w),
      this.preview.clientHeight / (this.invertSimulatedViewport ? w : h)
    );
    this.style.setProperty('--wcp-viewport-scale', `${scale - 0.05}`);
  }

  @eventOptions({ passive: false, capture: true })
  handleNavigation(event: Event) {
    event.preventDefault();
    const link = event.currentTarget as HTMLAnchorElement;
    this.openLink(link.getAttribute('href')!);
  }

  @eventOptions({ passive: true })
  handleSimulateViewport(event: Event) {
    const { dataset } = event.currentTarget as HTMLButtonElement;
    const viewport = dataset.viewport as Viewport;
    this.simulateViewport = this.simulateViewport === viewport ? undefined : viewport;
    if (this.simulateViewport === undefined) {
      this.style.removeProperty('--wcp-viewport-scale');
      this.style.removeProperty('--wcp-viewport-height');
      this.style.removeProperty('--wcp-viewport-width');
    } else {
      this.setPreviewSize();
      this.setPreviewScale();
    }
  }

  @eventOptions({ passive: true })
  handleInvertSimulatedViewport() {
    this.invertSimulatedViewport = !this.invertSimulatedViewport;
    this.setPreviewSize();
    this.setPreviewScale();
  }

  @eventOptions({ passive: true })
  handleReload() {
    this.reloadIframe();
  }

  @eventOptions({ passive: true })
  handleOpen() {
    window.open(this.getCurrentUrl(), '_blank');
  }

  @eventOptions({ passive: true })
  handleAsideToggle() {
    this.hideAside = !this.hideAside;
  }

  @eventOptions({ passive: true })
  handleComponentDetailsToggle() {
    this.hideComponentDetails = !this.hideComponentDetails;
  }

  @eventOptions({ passive: true })
  handleComponentDetailsExpand() {
    this.expandComponentDetails = !this.expandComponentDetails;
  }

  @eventOptions({ passive: true })
  async handlePreClick(event: Event) {
    const pre = event.currentTarget as HTMLPreElement;
    try {
      await window.navigator.clipboard.writeText(pre.innerText);
      pre.classList.add('copied');
      setTimeout(() => pre.classList.remove('copied'), 1000);
    } catch (error) {
      console.error('Failed to copy to clipboard. You have to be in https:// or localhost environment.');
    }
  }

  @eventOptions({ passive: true })
  async handleLoad() {
    const { src: path } = this.iframe;

    this.componentDetails = await this.resolveComponent(path);
    this.hasComponentDetails = this.componentDetails !== undefined;
  }

  override async firstUpdated() {
    // load reflection meta data
    const response = await fetch('/components.json');
    this.reflectionData = await response.json();

    // initialize preview iframe
    let initial = this.getCurrentUrl();
    const [link] = Object.values(this.componentMetaData);
    if (initial.trim() === '' && link !== undefined) {
      initial = link;
    }
    this.openLink(initial);
  }

  override disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
    super.disconnectedCallback();
  }

  override render(): TemplateResult {
    return html`
      <aside>
        <header>
          <button class="toggle-aside" @click="${this.handleAsideToggle}">
            <i class="${`gg-${this.hideAside ? 'menu' : 'close'}`}"></i>
          </button>
        </header>

        <nav>
          <h3>Components</h3>
          <ul>
            ${map(
              Object.entries(this.componentMetaData),
              ([component, entry]) => html`
                <li>
                  <a
                    href="${entry}"
                    class="${classMap({ active: entry === this.activeLink })}"
                    @click="${this.handleNavigation}"
                  >
                    ${component}
                  </a>
                </li>
              `
            )}
          </ul>
        </nav>
      </aside>

      <main role="main">
        <header class="controls">
          <nav class="viewport-controls">
            ${map(
              ['mobile', 'tablet', 'desktop', 'wide'] as const,
              (viewport) => html`
                <button
                  data-viewport="${viewport}"
                  aria-label="Set preview viewport to '${viewport}'"
                  class="${classMap({ active: viewport === this.simulateViewport })}"
                  @click="${this.handleSimulateViewport}"
                >
                  <i class="${`gg-${iconMap.get(viewport)}`}"></i>
                </button>
              `
            )}
            <button
              aria-label="Invert simulated viewport proportions"
              ?disabled="${this.simulateViewport === undefined}"
              class="${classMap({
                'toggle-ratio': true,
                active: this.simulateViewport !== undefined && this.invertSimulatedViewport,
              })}"
              @click="${this.handleInvertSimulatedViewport}"
            >
              <i class="gg-ratio"></i>
            </button>
          </nav>
          <nav class="content-controls">
            <button aria-label="Reload" @click="${this.handleReload}">
              <i class="gg-sync"></i>
            </button>
            <button aria-label="Open" @click="${this.handleOpen}">
              <i class="gg-external"></i>
            </button>
          </nav>
        </header>

        <div class="preview">
          <iframe @load="${this.handleLoad}"></iframe>
        </div>

        ${when(
          this.componentDetails !== undefined,
          () => html`
            <section class="component-details">
              <header>
                <nav>
                  <button class="toggle-details" @click="${this.handleComponentDetailsToggle}">
                    <i class="${`gg-${this.hideComponentDetails ? 'menu-right' : 'close'}`}"></i>
                  </button>
                  <button class="expand-details" @click="${this.handleComponentDetailsExpand}">
                    <i class="${`gg-push-chevron-${this.expandComponentDetails ? 'down' : 'up'}`}"></i>
                  </button>
                </nav>
              </header>

              <div class="markdown-body" .innerHTML="${marked(this.componentDetails!.readme)}"></div>
            </section>
          `
        )}
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-legacy': Legacy;
  }
}
