export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
             <option selected value="ASSIGNMENTS">
                ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
             <option selected value="Percentage">
             Percentage</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
             <option selected value="ONLINE">
             Online</option>
            </select>
            <br/>
            <label>Online Entry Option</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-text-entry"/>
            <label htmlFor="wd-wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recording</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label>Assign to</label><br/>
            <input id="wd-assign-to" value={"Everyone"}></input>
            <br/>
            <br/>
            <label htmlFor="wd-due-date"> Due </label><br />
            <input type="date"
                id="wd-due-date"
                value="2024-05-13"/><br/><br />
            <label htmlFor="wd-due-date">Due</label><br />
                <input type="date" id="wd-due-date" value="2024-05-13" /><br/><br />
                
                <label htmlFor="wd-available-from">Available from</label>&nbsp;
                <label htmlFor="wd-available-until">Until</label><br />
                
                <input type="date" id="wd-available-from" value="2024-05-06"/> &nbsp;
                <input type="date" id="wd-available-until" value="2024-05-20"/><br/><br/>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <hr />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <table width="100%">
              <tr>
                <td></td>
                <td align="right">
                  <button>Cancel</button>&nbsp;
                  <button>Save</button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
);}
