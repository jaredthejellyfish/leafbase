function html({
  url,
  host,
}: {
  url: string;
  host: string;
  theme: { brandColor?: string; buttonText?: string };
}) {
  const escapedHost = host
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `
  <body style="background: transparent;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#1e1e1e; padding-top: 20px;"
    id="bodyTable">
    <tbody>
      <tr>
        <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
            <tbody>
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard"
                    style="background-color:#282828;border-color:#303030;border-style:solid;border-width:0 1px 1px 1px;">
                    <tbody>
                      <tr>
                        <td style="background-color:#2f855a;font-size:1px;line-height:3px" class="topBorder" height="3">
                          &nbsp;</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 40px;"
                          align="center" valign="top" class="mainTitle">
                          <h2 class="text"
                            style="color:#ffffff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">
                            Sign in to ${escapedHost}</h2>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center"
                          valign="top" class="subTitle">
                          <h4 class="text"
                            style="color:#cccccc;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">
                            Sign in with a magic link!</h4>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-left:20px;padding-right:20px" align="center" valign="top"
                          class="containtTable ui-sortable">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"
                            style="">
                            <tbody>
                              <tr>
                                <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                  <p class="text"
                                    style="color:#999999;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">
                                    Click the button below to sign in using a magic link that will securely log you into
                                    your account instantly. No need to remember passwords!</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"
                            style="margin-bottom: 20px;">
                            <tbody>
                              <tr>
                                <td style="padding-top:20px;padding-bottom:20px;" align="center" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="background-color: #2f855a; padding: 12px 35px; border-radius: 50px;"
                                          align="center" class="ctaButton"> <a href="${url}"
                                            style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block"
                                            target="_blank" class="text">Sign In</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                    <tbody>
                      <tr>
                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
`;
}

export { html };
