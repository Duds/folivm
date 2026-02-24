import { useMemo } from "react";
import { Editor } from "../../Editor";
import { TabBar, type TabInfo } from "@/components/shell/TabBar";
import { Ruler, type RulerUnits } from "@/components/canvas/Ruler";
import { parseDocument, serializeDocument } from "@/frontmatter";
import { cn } from "@/lib/utils";

interface EditorCommandsRef {
  focusAtHeading: (index: number) => void;
  toggleHeading: (level: 1 | 2 | 3 | 4) => void;
  setParagraph: () => void;
  toggleCallout: () => void;
  toggleExecutiveSummary: () => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleCode: () => void;
  toggleLink: (url?: string) => void;
  getActiveMarks: () => { bold: boolean; italic: boolean; code: boolean };
}

interface EditorCanvasProps {
  currentDoc: string | null;
  docContent: string;
  onDocContentChange: (content: string) => void;
  onSave: () => void;
  tabs?: TabInfo[];
  activeTabId?: string | null;
  onSwitchTab?: (id: string) => void;
  onCloseTab?: (id: string, e: React.MouseEvent) => void;
  viewMode?: "document" | "preview" | "outline";
  zoomLevel?: number;
  showNonPrintingChars?: boolean;
  rulerUnits?: RulerUnits;
  onSelectionChange?: (
    nodeId: string | null,
    hasCharacterRange: boolean
  ) => void;
  editorCommandsRef?: React.RefObject<EditorCommandsRef | null>;
}

export function EditorCanvas({
  currentDoc,
  docContent,
  onDocContentChange,
  onSave,
  tabs = [],
  activeTabId = null,
  onSwitchTab,
  onCloseTab,
  viewMode = "document",
  zoomLevel = 100,
  showNonPrintingChars = false,
  rulerUnits = "mm",
  onSelectionChange,
  editorCommandsRef,
}: EditorCanvasProps) {
  const { body } = useMemo(
    () => parseDocument(docContent),
    [docContent]
  );

  const isPreview = viewMode === "preview";

  return (
    <section
      className={cn("canvas-area", isPreview && "canvas-area-preview")}
    >
      {tabs.length > 0 && onSwitchTab && onCloseTab && (
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId}
          onSwitchTab={onSwitchTab}
          onCloseTab={onCloseTab}
        />
      )}
      {currentDoc && viewMode === "document" && (
        <Ruler units={rulerUnits} />
      )}
      <div
        className="canvas-scroll"
        style={
          isPreview
            ? { zoom: zoomLevel / 100 }
            : undefined
        }
      >
        {currentDoc ? (
          <div
            className={cn("editor-area", "editor-wysiwyg")}
          >
            <Editor
              content={body}
              showNonPrintingChars={showNonPrintingChars}
              onChange={(newBody) => {
                const { frontmatter } = parseDocument(docContent);
                onDocContentChange(serializeDocument(frontmatter, newBody));
              }}
              onSave={onSave}
              onSelectionChange={onSelectionChange}
              editorCommandsRef={editorCommandsRef}
            />
          </div>
        ) : (
          <div className="empty-editor">
            <div className="empty-editor-content">
              <div className="empty-editor-watermark" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M420.5,686.0L397.0,686.0 L397.0,595.5L397.0,505.0 L377.0,505.0C366.0,505.0 357.0,504.83586976035883 357.0,504.6352661341307C357.0,504.43466250790254 361.93435764851074,493.97216250790257 367.96523921891276,481.3852661341307L378.9304784378255,458.5 L387.96523921891276,458.2124741862112L397.0,457.92494837242236 L397.0173636237746,431.7124741862112C397.02978164948325,412.9659738843475 397.4383235890421,403.595686706288 398.45172372341574,398.8140988935769C399.2310717851423,395.1368532850442 400.9761824397935,389.38639758932965 402.32974740041834,386.03530845865566C403.68331236104314,382.6842193279816 406.30035031620463,377.44260770893897 408.1453873007772,374.3872826385608C409.9904242853497,371.3319575681827 414.2079993716222,365.9964351989689 417.5177763813826,362.5305662625302C420.827553391143,359.06469732609156 427.127553391143,353.919160952169 431.5177763813826,351.09604098714686C436.3053264562899,348.0174210104252 443.30212333245845,344.69324317552224 449.0,342.79023744784956C458.4079586775595,339.64811972685845 458.7302840706689,339.61349311916854 482.26865752629493,339.2162691004593L506.03731505258986,338.81515890141696 L505.76865752629493,362.15757945070845L505.5,385.5 L485.5,386.0031736896766C467.3568964131507,386.4596303083756 465.0357758967123,386.7199313797923 460.5,388.80678803857853C457.75,390.07203040115246 454.2205388168738,392.320602240798 452.6567529263862,393.80361434890193C451.09296703589865,395.28662645700587 448.61796703589863,398.75 447.1567529263862,401.5C444.50771361663675,406.4854829996419 444.49909571752823,406.57476255184423 444.1885436214593,432.25L443.8770872429186,458.0 L472.39460356259656,458.0L500.9121198822745,458.0 L493.5955804527004,473.25C489.57148376643465,481.6375 484.5111555392134,492.1 482.35040661443094,496.5L478.4217722057356,504.5 L461.2108861028678,504.7736139272705L444.0,505.047227854541 L444.0,595.5236139272705L444.0,686.0 L420.5,686.0z" />
                  <path d="M568.1666666666667,686.0C555.6083333333333,686.0 545.0333333333334,685.7 544.6666666666667,685.3333333333333C544.3,684.9666666666666 544.0,644.2509841411553 544.0,594.854038832197L544.0,505.0414109977275 L524.182362032835,504.7707054988638L504.36472406567,504.5 L515.0827440706001,481.5L525.8007640755303,458.5 L534.797092412349,458.2138410153932L543.7934207491677,457.9276820307864 L544.2484649649903,430.2138410153932C544.6468878492573,405.9484441868446 544.969063974861,401.5226113943901 546.8376725728734,394.6450976270794C548.0114624385068,390.32490132197313 550.8906728728239,383.14169573497435 553.2359179824671,378.68241854485996C556.3502859682214,372.76072189004407 559.7919936094883,368.27274482405676 566.0005909855693,362.03732091778056C570.6759160276324,357.34179441300125 577.0754603319139,351.99042428535165 580.2218005506392,350.1453873007814C583.3681407693645,348.30035031621117 588.6842193279665,345.6833123610499 592.0353084586436,344.329747400423C595.3863975893207,342.97618243979605 601.1368532850394,341.23107178514306 604.8140988935738,340.4517237234163C609.3642148694768,339.4873812660559 618.2882299335831,339.02918050540063 632.75,339.0173636237747L654.0,339.0 L654.0,362.42629124696845L654.0,385.8525824939369 L633.75,386.17629124696845C614.3557428788827,386.4863204217166 613.2675760082047,386.6099314901612 608.0,389.10138031025303C604.975,390.5321394808922 601.1956211396135,393.00713948089225 599.6013803102521,394.60138031025303C598.0071394808908,396.1956211396139 595.5321394808909,399.975 594.1013803102521,403.0C591.552242100582,408.38954650265134 591.4934342603493,408.99704073806896 591.1730608903708,433.25L590.8461217807417,458.0 L619.4230608903708,458.0C635.1403774006669,458.0 647.9788073050164,458.3375 647.9529051222587,458.75C647.9270029395011,459.1625 643.0445235561012,469.625 637.1029509369258,482.0L626.3000916293341,504.5 L608.650045814667,504.7730743898455L591.0,505.04614877969095 L591.0,595.5230743898455L591.0,686.0 L568.1666666666667,686.0z" />
                  <path d="M647.5,686.0L628.0,686.0 L628.0,666.5L628.0,647.0 L647.5,647.0L667.0,647.0 L667.0,666.5L667.0,686.0 L647.5,686.0z" />
                </svg>
              </div>
              <div className="empty-editor-shortcuts">
                <div className="shortcut-row">
                  <span className="shortcut-action">New document</span>
                  <span className="shortcut-keys">
                    {["⌘", "N"].map((k) => (
                      <kbd key={k} className="keycap">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="shortcut-action">New project</span>
                  <span className="shortcut-keys">
                    {["⌘", "⇧", "P"].map((k) => (
                      <kbd key={k} className="keycap">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="shortcut-action">Open project</span>
                  <span className="shortcut-keys">
                    {["⌘", "O"].map((k) => (
                      <kbd key={k} className="keycap">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="shortcut-action">Open document</span>
                  <span className="shortcut-keys">
                    {["⌘", "⇧", "O"].map((k) => (
                      <kbd key={k} className="keycap">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="shortcut-action">Save</span>
                  <span className="shortcut-keys">
                    {["⌘", "S"].map((k) => (
                      <kbd key={k} className="keycap">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="shortcut-action">Find in project</span>
                  <span className="shortcut-keys">
                    {["⌘", "⇧", "F"].map((k) => (
                      <kbd key={k} className="keycap">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
