import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_pptx():
    prs = Presentation()
    # 16:9 widescreen: 13.333 x 7.5 inches
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_slide_layout = prs.slide_layouts[6]
    
    # Colors
    DARK_BG = RGBColor(10, 25, 47)       # #0a192f
    DARK_FLOW_BG = RGBColor(13, 17, 22)  # #0d1116
    DARK_CARD = RGBColor(15, 33, 60)     # #0f213c
    LIGHT_BG = RGBColor(248, 250, 252)   # #f8fafc
    WHITE = RGBColor(255, 255, 255)
    GREEN_ACCENT = RGBColor(0, 131, 108) # #00836c
    GREEN_SOFT = RGBColor(220, 245, 238)
    ORANGE_ACCENT = RGBColor(245, 130, 32) # #f58220
    CRIMSON = RGBColor(208, 59, 59)      # #d03b3b
    INK_PRIMARY = RGBColor(15, 23, 42)
    INK_MUTED = RGBColor(100, 116, 139)
    BORDER_LIGHT = RGBColor(226, 232, 240)

    screenshots_dir = "/Volumes/DiskD/HACKATHONS/Prahar/pitch-deck/screenshots"

    def set_slide_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, title, category="ANTICIPATORY RESILIENCE", is_dark=False):
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.5), Inches(0.08), Inches(0.45))
        bar.fill.solid()
        bar.fill.fore_color.rgb = RGBColor(0, 209, 178) if is_dark else GREEN_ACCENT
        bar.line.fill.background()

        tx_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.45), Inches(11.5), Inches(0.55))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = WHITE if is_dark else INK_PRIMARY

    # ==========================================
    # SLIDE 1: COVER SLIDE (Dark Navy)
    # ==========================================
    s1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s1, DARK_BG)

    pill = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.3), Inches(1.2), Inches(4.7), Inches(0.45))
    pill.fill.solid()
    pill.fill.fore_color.rgb = RGBColor(16, 42, 67)
    pill.line.color.rgb = GREEN_ACCENT
    pill_tf = pill.text_frame
    p = pill_tf.paragraphs[0]
    p.text = "⚡ AI-POWERED CYCLONE RESILIENCE PLATFORM"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0, 209, 178)
    p.alignment = PP_ALIGN.CENTER

    t_box = s1.shapes.add_textbox(Inches(1.5), Inches(1.9), Inches(10.3), Inches(1.2))
    tf = t_box.text_frame
    p = tf.paragraphs[0]
    p.text = "PRAHAR"
    p.font.size = Pt(64)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER

    sub_box = s1.shapes.add_textbox(Inches(1.5), Inches(3.1), Inches(10.3), Inches(0.6))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Predictive Risk & Anticipatory Hazard Action Resource"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = RGBColor(148, 163, 184)
    p.alignment = PP_ALIGN.CENTER

    tag_box = s1.shapes.add_textbox(Inches(1.5), Inches(3.7), Inches(10.3), Inches(0.5))
    tf = tag_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Track-Based Cyclone Impact & Infrastructure Vulnerability Forecaster for Bay of Bengal & Coastal APAC"
    p.font.size = Pt(13)
    p.font.color.rgb = RGBColor(100, 116, 139)
    p.alignment = PP_ALIGN.CENTER

    pills = [
        ("Google Earth Engine", RGBColor(30, 58, 95)),
        ("Gemini 1.5 Flash", RGBColor(76, 29, 149)),
        ("FastAPI & React", RGBColor(12, 74, 96)),
        ("22 Indic Languages", RGBColor(20, 83, 45))
    ]
    pill_w = Inches(2.3)
    start_x = Inches(1.7)
    for i, (txt, bg_c) in enumerate(pills):
        pl = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, start_x + i * (pill_w + Inches(0.3)), Inches(4.5), pill_w, Inches(0.45))
        pl.fill.solid()
        pl.fill.fore_color.rgb = bg_c
        pl.line.fill.background()
        tf = pl.text_frame
        p = tf.paragraphs[0]
        p.text = txt
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.alignment = PP_ALIGN.CENTER

    foot_box = s1.shapes.add_textbox(Inches(2.0), Inches(5.8), Inches(9.3), Inches(0.8))
    tf = foot_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Designed for District Magistrates, NDRF Commanders & State Disaster Authorities (OSDMA, WBDMD, APSDMA, TNDMA) to trigger anticipatory evacuations < T-12h before landfall."
    p.font.size = Pt(12)
    p.font.italic = True
    p.font.color.rgb = RGBColor(148, 163, 184)
    p.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 2: CORE OBJECTIVES (5 Pillars)
    # ==========================================
    s2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s2, LIGHT_BG)
    add_header(s2, "Core Objectives")

    pillars = [
        ("1. Track Telemetry", "Ingest IMD, JTWC, Tide Gauges & Copernicus 30m GEE DEM in real-time.", GREEN_ACCENT),
        ("2. Surge Modeling", "Hydrodynamic coastal inundation envelopes across 3 surge hazard tiers.", ORANGE_ACCENT),
        ("3. Infrastructure Graph", "Pinpoint severed CHCs, tripped substations, and cutoff shelters.", CRIMSON),
        ("4. Multimodal SOPs", "Gemini Flash auto-drafts tactical cadre directives in 22 Indic tongues.", GREEN_ACCENT),
        ("5. Parametric Escrow", "Automated smart escrow releases disaster liquidity at T-24h with 0 latency.", ORANGE_ACCENT)
    ]
    card_w = Inches(2.2)
    card_h = Inches(4.2)
    card_y = Inches(1.3)
    start_x = Inches(0.8)

    for i, (title, desc, accent) in enumerate(pillars):
        x = start_x + i * (card_w + Inches(0.18))
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, card_y, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = BORDER_LIGHT

        ib = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, x + Inches(0.2), card_y + Inches(0.25), Inches(0.4), Inches(0.06))
        ib.fill.solid()
        ib.fill.fore_color.rgb = accent
        ib.line.fill.background()

        tb = s2.shapes.add_textbox(x + Inches(0.2), card_y + Inches(0.45), card_w - Inches(0.4), card_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = INK_PRIMARY
        p1.space_after = Pt(14)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = INK_MUTED

    mb = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.8), Inches(11.7), Inches(0.9))
    mb.fill.solid()
    mb.fill.fore_color.rgb = GREEN_SOFT
    mb.line.color.rgb = RGBColor(167, 243, 208)
    tf = mb.text_frame
    p = tf.paragraphs[0]
    p.text = "Our Mission: Transform reactive cyclone disaster relief into predictive, automated anticipatory action — protecting 170M+ coastal citizens across the Bay of Bengal & Coastal APAC."
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 3: THE COASTAL VULNERABILITY GAP
    # ==========================================
    s3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s3, LIGHT_BG)
    add_header(s3, "The Coastal Vulnerability Gap")

    p_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.3), Inches(5.7), Inches(5.4))
    p_box.fill.solid()
    p_box.fill.fore_color.rgb = WHITE
    p_box.line.color.rgb = BORDER_LIGHT
    tf = p_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = Inches(0.3)
    p = tf.paragraphs[0]
    p.text = "🔴 The Problem Today"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = CRIMSON
    p.space_after = Pt(14)

    problems = [
        ("Fragmented Telemetry Silos", "Cyclone tracks from IMD, bathymetry, power grids, and hospital directories exist in disconnected silos. No real-time spatial correlation."),
        ("12-24h Bureaucratic Response Lag", "Current administrative dashboards operate post-landfall. Damage assessments occur 24-48 hours after coastal embankments are overtopped."),
        ("Static Paper-Based Emergency SOPs", "District Collectors rely on generic paper manuals unsuited for live dynamic water levels, leading to trapped civilians and submerged relief routes.")
    ]
    for pt, pd in problems:
        p1 = tf.add_paragraph()
        p1.text = "▲ " + pt
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = INK_PRIMARY
        p1.space_before = Pt(12)
        p2 = tf.add_paragraph()
        p2.text = pd
        p2.font.size = Pt(11)
        p2.font.color.rgb = INK_MUTED

    q_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.3), Inches(5.7), Inches(5.4))
    q_box.fill.solid()
    q_box.fill.fore_color.rgb = RGBColor(254, 242, 242)
    q_box.line.color.rgb = RGBColor(254, 202, 202)
    tf = q_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = Inches(0.5)
    p = tf.paragraphs[0]
    p.text = "⚠️"
    p.font.size = Pt(36)
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(16)

    p1 = tf.add_paragraph()
    p1.text = "\"The storm surge inundated the coastal arterial highway before the evacuation buses were dispatched.\""
    p1.font.size = Pt(17)
    p1.font.bold = True
    p1.font.color.rgb = CRIMSON
    p1.alignment = PP_ALIGN.CENTER
    p1.space_after = Pt(20)

    p2 = tf.add_paragraph()
    p2.text = "Without predictive, track-based infrastructure vulnerability modeling, relief forces deploy blindly after lifelines sever. Coastal districts lose critical power and emergency medical access within hours."
    p2.font.size = Pt(12)
    p2.font.color.rgb = INK_MUTED
    p2.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 4: THE PRAHAR SOLUTION
    # ==========================================
    s4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s4, LIGHT_BG)
    add_header(s4, "The PRAHAR Solution")

    sol_cards = [
        ("1. Unified Geoprobe", "Direct ingestion of live IMD track coordinates, JTWC advisories, Copernicus 30m DEM elevation, and OSM critical lifelines into a unified spatial graph.", GREEN_ACCENT),
        ("2. Multimodal AI Triage", "Gemini 1.5 Flash evaluates hydrological choke points, drafting role-directed SOPs and generating multi-lingual Web Speech broadcasts in 22 Indic languages.", ORANGE_ACCENT),
        ("3. Parametric Liquidity", "Automated pre-landfall escrow releases emergency cash reserves at T-24h directly to SDRF accounts without bureaucratic verification delays.", GREEN_ACCENT)
    ]
    card_w = Inches(3.7)
    card_h = Inches(3.8)
    card_y = Inches(1.4)
    start_x = Inches(0.8)

    for i, (title, desc, accent) in enumerate(sol_cards):
        x = start_x + i * (card_w + Inches(0.3))
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, card_y, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = BORDER_LIGHT

        ib = s4.shapes.add_shape(MSO_SHAPE.RECTANGLE, x + Inches(0.3), card_y + Inches(0.3), Inches(0.5), Inches(0.08))
        ib.fill.solid()
        ib.fill.fore_color.rgb = accent
        ib.line.fill.background()

        tb = s4.shapes.add_textbox(x + Inches(0.3), card_y + Inches(0.5), card_w - Inches(0.6), card_h - Inches(0.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = INK_PRIMARY
        p1.space_after = Pt(14)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = INK_MUTED

    val_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.6), Inches(11.7), Inches(1.1))
    val_box.fill.solid()
    val_box.fill.fore_color.rgb = GREEN_SOFT
    val_box.line.color.rgb = RGBColor(167, 243, 208)
    tf = val_box.text_frame
    p = tf.paragraphs[0]
    p.text = "💡 The 5-Minute District Collector Value: You don't have to decipher raw radar files. PRAHAR instantly highlights which bridge is severed, which hospital loses backup power, and where assault craft must be pre-staged."
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 5: LIVE OPERATIONS COCKPIT
    # ==========================================
    s5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s5, LIGHT_BG)
    add_header(s5, "Live Operations Cockpit", "INTERACTIVE DEMONSTRATION")

    img_path = os.path.join(screenshots_dir, "cockpit_light.png")
    if os.path.exists(img_path):
        s5.shapes.add_picture(img_path, Inches(0.8), Inches(1.3), Inches(8.2), Inches(5.4))

    rf = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.3), Inches(1.3), Inches(3.2), Inches(5.4))
    rf.fill.solid()
    rf.fill.fore_color.rgb = WHITE
    rf.line.color.rgb = BORDER_LIGHT
    tf = rf.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = Inches(0.25)
    p = tf.paragraphs[0]
    p.text = "Operational Capabilities"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.space_after = Pt(12)

    features = [
        ("Real-time Track Ingestion", "Tracks active storms (e.g. Cyclone DANA 125 km/h) with 6-stage temporal waypoints."),
        ("3-Tier Surge Inundation", "High-resolution polygons for >2.5m, 1.5-2.5m, and 0.5-1.5m forecast surge."),
        ("District Vulnerability Index", "Automated ranking of districts (Bhadrak 94%, Kendrapara 89%)."),
        ("Multimodal Directives", "Gemini 1.5 Flash generates action orders for NDRF, DMs & Panchayats.")
    ]
    for ft, fd in features:
        p1 = tf.add_paragraph()
        p1.text = "• " + ft
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = INK_PRIMARY
        p2 = tf.add_paragraph()
        p2.text = fd
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = INK_MUTED
        p2.space_after = Pt(6)

    # ==========================================
    # SLIDE 6: STATE JURISDICTION & 22 LANGUAGES
    # ==========================================
    s6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s6, LIGHT_BG)
    add_header(s6, "State Operations & 22 Official Indic Languages")

    img_odisha = os.path.join(screenshots_dir, "odisha_landfall.png")
    img_dark = os.path.join(screenshots_dir, "cockpit_dark.png")
    if os.path.exists(img_odisha) and os.path.exists(img_dark):
        s6.shapes.add_picture(img_odisha, Inches(0.8), Inches(1.3), Inches(5.7), Inches(3.8))
        s6.shapes.add_picture(img_dark, Inches(6.8), Inches(1.3), Inches(5.7), Inches(3.8))

    b1 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.3), Inches(5.7), Inches(1.7))
    b1.fill.solid()
    b1.fill.fore_color.rgb = WHITE
    b1.line.color.rgb = BORDER_LIGHT
    tf = b1.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "🏛️ Multi-State Operational Jurisdictions"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "1-click filtering across National (NDMA), Odisha (OSDMA), West Bengal (WBDMD), Andhra Pradesh (APSDMA), and Tamil Nadu (TNDMA) automatically re-centers GIS and updates state-specific choke points."
    p2.font.size = Pt(10)
    p2.font.color.rgb = INK_MUTED

    b2 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(5.3), Inches(5.7), Inches(1.7))
    b2.fill.solid()
    b2.fill.fore_color.rgb = WHITE
    b2.line.color.rgb = BORDER_LIGHT
    tf = b2.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "🎙️ All 22 Eighth Schedule Indian Languages"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = ORANGE_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "Native translations and instant Web Speech audio broadcasts for Odia, Bengali, Telugu, Tamil, Hindi, Marathi, Gujarati, etc. Dark Mode supports 24/7 command center screening without visual fatigue."
    p2.font.size = Pt(10)
    p2.font.color.rgb = INK_MUTED

    # ==========================================
    # SLIDE 7: MOBILE CITIZEN RESILIENCE SIMULATOR
    # ==========================================
    s7 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s7, LIGHT_BG)
    add_header(s7, "Mobile Citizen Simulator (PWA)")

    img_mob = os.path.join(screenshots_dir, "mobile_simulator.png")
    if os.path.exists(img_mob):
        s7.shapes.add_picture(img_mob, Inches(0.8), Inches(1.3), Inches(6.0), Inches(5.4))

    rc = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(1.3), Inches(5.4), Inches(5.4))
    rc.fill.solid()
    rc.fill.fore_color.rgb = WHITE
    rc.line.color.rgb = BORDER_LIGHT
    tf = rc.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = Inches(0.3)
    p = tf.paragraphs[0]
    p.text = "📱 Last-Mile Citizen Protection"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.space_after = Pt(12)

    mob_features = [
        ("Offline-First Progressive Web App", "Pre-caches elevation maps and shelter waypoints. Fully functional even when mobile towers lose power or backhaul connections."),
        ("Safe Navigation to Multi-Purpose Shelters", "Real-time routing diverts citizens away from flooded roads toward elevated shelters with verified remaining capacity."),
        ("One-Tap SOS Distress Beacon", "Broadcasts GPS coordinates, battery level, and family count to district emergency operations centers."),
        ("Parametric Relief QR Pass", "Digital QR credentials enable immediate ration and relief fund verification at local evacuation shelters.")
    ]
    for mft, mfd in mob_features:
        p1 = tf.add_paragraph()
        p1.text = "✓ " + mft
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = INK_PRIMARY
        p2 = tf.add_paragraph()
        p2.text = mfd
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = INK_MUTED
        p2.space_after = Pt(8)

    # ==========================================
    # SLIDE 8: INFRASTRUCTURE MATRIX & CHOKE POINTS
    # ==========================================
    s8 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s8, LIGHT_BG)
    add_header(s8, "Infrastructure Vulnerability Matrix")

    img_infra = os.path.join(screenshots_dir, "infrastructure_matrix.png")
    if os.path.exists(img_infra):
        s8.shapes.add_picture(img_infra, Inches(0.8), Inches(1.3), Inches(7.8), Inches(5.4))

    re = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.9), Inches(1.3), Inches(3.6), Inches(5.4))
    re.fill.solid()
    re.fill.fore_color.rgb = WHITE
    re.line.color.rgb = BORDER_LIGHT
    tf = re.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = Inches(0.25)
    p = tf.paragraphs[0]
    p.text = "5 Critical Lifeline Sectors"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = CRIMSON
    p.space_after = Pt(10)

    sectors = [
        ("🏥 Primary Health Centers (CHCs)", "Elevation vs surge calculation flags oxygen manifold flooding and power cutoffs before breach."),
        ("⚡ 33/11kV Substation Grids", "Tripping predictions prevent equipment burnout and identify affected consumer counts."),
        ("🏕️ Multi-Purpose Cyclone Shelters", "Live capacity tracking and road severance warnings dispatch amphibious assault craft."),
        ("🌉 Arterial Highways & Bridges", "Identifies specific road cuts (e.g. SH-9A) causing ambulance reroutes of 4.2+ hours.")
    ]
    for st, sd in sectors:
        p1 = tf.add_paragraph()
        p1.text = st
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = INK_PRIMARY
        p2 = tf.add_paragraph()
        p2.text = sd
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = INK_MUTED
        p2.space_after = Pt(6)

    # ==========================================
    # SLIDE 9: PARAMETRIC ESCROW & MATHEMATICAL MODEL
    # ==========================================
    s9 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s9, LIGHT_BG)
    add_header(s9, "Parametric Escrow & Predictive Mathematical Model")

    img_escrow = os.path.join(screenshots_dir, "parametric_escrow.png")
    if os.path.exists(img_escrow):
        s9.shapes.add_picture(img_escrow, Inches(0.8), Inches(1.3), Inches(6.0), Inches(5.4))

    mc = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(1.3), Inches(5.4), Inches(5.4))
    mc.fill.solid()
    mc.fill.fore_color.rgb = WHITE
    mc.line.color.rgb = BORDER_LIGHT
    tf = mc.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = Inches(0.3)
    p = tf.paragraphs[0]
    p.text = "Mathematical Vulnerability Formulation"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.space_after = Pt(10)

    fb = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.3), Inches(2.0), Inches(5.0), Inches(1.1))
    fb.fill.solid()
    fb.fill.fore_color.rgb = RGBColor(241, 245, 249)
    fb.line.color.rgb = RGBColor(203, 213, 225)
    f_tf = fb.text_frame
    fp = f_tf.paragraphs[0]
    fp.text = "V_dist = 0.45 * (S_peak / E_mean) + 0.35 * (C_sev / C_tot) + 0.20 * ρ_kutcha"
    fp.font.size = Pt(11.5)
    fp.font.bold = True
    fp.font.color.rgb = RGBColor(30, 41, 59)
    fp.alignment = PP_ALIGN.CENTER

    tf.margin_top = Inches(1.8)
    p = tf.add_paragraph()
    p.text = "Escrow Automation Protocol:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = INK_PRIMARY
    p.space_before = Pt(8)

    rules = [
        ("Zero Claims Processing", "Funds disburse automatically at T-24h once storm track & surge thresholds are met."),
        ("Pre-Landfall Disaster Liquidity", "Allocates ₹21.00 Cr pool directly to impacted coastal state SDRF accounts (e.g. ₹10.5 Cr Odisha, ₹5.25 Cr WB)."),
        ("Cryptographic Auditability", "Every payout is recorded with verifiable blockchain-inspired hashes preventing administrative diversion.")
    ]
    for rt, rd in rules:
        p1 = tf.add_paragraph()
        p1.text = "● " + rt + ": " + rd
        p1.font.size = Pt(10)
        p1.font.color.rgb = INK_MUTED
        p1.space_before = Pt(4)

    # ==========================================
    # SLIDE 10: SYSTEM ARCHITECTURE (FROM README.MD)
    # ==========================================
    s10 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s10, LIGHT_BG)
    add_header(s10, "System Architecture & Decoupled Pipelines", "FROM SYSTEM README SPECIFICATION")

    tiers = [
        ("1. External Feeds & Telemetry", [
            "• IMD / JTWC: Real-time cyclone tracks & cones",
            "• Google Earth Engine: Copernicus DEM 30m, Sentinel-1 SAR",
            "• OSM Overpass: Hospitals, Sub-stations, Arterial Bridges",
            "• INCOIS / NOAA: Coastal Tide Gauges & Bathymetry"
        ], RGBColor(30, 58, 95)),

        ("2. Ingestion Microservice (:8001)", [
            "• Async Ingestion Worker & Poller Daemon",
            "• Track Normalizer & Cone of Uncertainty Generator",
            "• GEE Elevation & Bathymetric Sampler",
            "• OSM Infrastructure Feature Extractor"
        ], GREEN_ACCENT),

        ("3. Core Simulation Engine (:8010)", [
            "• FastAPI 0.111 Application Core",
            "• SLOSH Storm Surge & Inundation Model",
            "• Compound River-Surge Backwater Engine",
            "• NetworkX Infrastructure Severance Graph",
            "• Parametric Escrow Controller & Gemini AI"
        ], ORANGE_ACCENT),

        ("4. Storage & Presentation Tier", [
            "• PostgreSQL / PostGIS Spatial DB & Redis Cache",
            "• React 18 + TS + Leaflet GIS 3D Cockpit (:5174)",
            "• T-72h to Landfall Temporal Playback Scrubber",
            "• Role-Differentiated SOPs & 22 Indic Audio"
        ], CRIMSON)
    ]

    tier_w = Inches(2.75)
    tier_h = Inches(4.5)
    start_x = Inches(0.8)

    for i, (ttitle, items, accent) in enumerate(tiers):
        x = start_x + i * (tier_w + Inches(0.23))
        card = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.3), tier_w, tier_h)
        card.fill.solid()
        card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = BORDER_LIGHT

        top_bar = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, x + Inches(0.2), Inches(1.5), Inches(0.5), Inches(0.08))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = accent
        top_bar.line.fill.background()

        tb = s10.shapes.add_textbox(x + Inches(0.2), Inches(1.7), tier_w - Inches(0.4), tier_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = ttitle
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = INK_PRIMARY
        p.space_after = Pt(14)

        for it in items:
            p2 = tf.add_paragraph()
            p2.text = it
            p2.font.size = Pt(10)
            p2.font.color.rgb = INK_MUTED
            p2.space_after = Pt(6)

    pb = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.0), Inches(11.7), Inches(0.8))
    pb.fill.solid()
    pb.fill.fore_color.rgb = RGBColor(241, 245, 249)
    pb.line.color.rgb = RGBColor(203, 213, 225)
    tf = pb.text_frame
    p = tf.paragraphs[0]
    p.text = "⚡ Decoupled Pipeline: External Feeds ➔ Ingestion Worker (:8001) ➔ Spatial DB ➔ Core Engine (:8010) ➔ React GIS (:5174)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT
    p.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 11: END-TO-END ARCHITECTURE DIAGRAM (UPLOADED IMAGE)
    # ==========================================
    s11 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(s11, DARK_FLOW_BG)
    add_header(s11, "End-to-End System Data Flow Diagram", "SYSTEM DATA FLOW (README SPECIFICATION)", is_dark=True)

    img_diag = os.path.join(screenshots_dir, "system_architecture_diagram.png")
    if os.path.exists(img_diag):
        s11.shapes.add_picture(img_diag, Inches(0.8), Inches(1.3), Inches(11.7), Inches(4.5))

    # Bottom Flow Callout Box
    diag_banner = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.0), Inches(11.7), Inches(0.9))
    diag_banner.fill.solid()
    diag_banner.fill.fore_color.rgb = RGBColor(22, 27, 34)
    diag_banner.line.color.rgb = RGBColor(48, 54, 61)
    tf = diag_banner.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "⚡ Architectural Flow: External Feeds & GEE ➔ Async Ingestion Engine (:8001) ➔ PostGIS / Redis ➔ FastAPI Engine (:8010) ➔ SLOSH / NetworkX / Gemini Flash ➔ War Room & 22 Indic Audio (:5174)"
    p.font.size = Pt(11.5)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0, 209, 178)
    p.alignment = PP_ALIGN.CENTER

    out_pptx = "/Volumes/DiskD/HACKATHONS/Prahar/pitch-deck/PRAHAR-Pitch-Deck.pptx"
    prs.save(out_pptx)
    print(f"Successfully generated PPTX: {out_pptx}")

if __name__ == "__main__":
    create_pptx()
